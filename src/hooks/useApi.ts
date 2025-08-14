import { useState, useEffect, useCallback } from 'react';
import { ScrapedData } from '../../types';
import { apiService } from '../services/api';
import { cacheService } from '../services/cache';
import { CACHE_KEYS } from '../constants/config';

interface UseApiOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useApi = (options: UseApiOptions = {}) => {
  const [data, setData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('unknown');
  const [cacheStatus, setCacheStatus] = useState<string>('unknown');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0); // Track consecutive errors

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    // Check cache first
    const cachedData = cacheService.get<ScrapedData>(CACHE_KEYS.IPL_DATA);
    if (cachedData) {
      setData(cachedData);
      setDataSource(cachedData.dataSource || 'cache');
      setCacheStatus('hit');
      setLastUpdated(cachedData.lastUpdated || null);
      setErrorCount(0); // Reset error count on successful cache hit
      if (showLoading) setLoading(false);
      return;
    }

    try {
      const response = await apiService.fetchIPLData();
      const scrapedData = response.data;
      
      // Cache the data
      cacheService.set(CACHE_KEYS.IPL_DATA, scrapedData);
      
      setData(scrapedData);
      setDataSource(scrapedData.dataSource || 'api');
      setCacheStatus('miss');
      setLastUpdated(scrapedData.lastUpdated || new Date().toISOString());
      setErrorCount(0); // Reset error count on success
      
      options.onSuccess?.(scrapedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setCacheStatus('fallback');
      setErrorCount(prev => prev + 1); // Increment error count
      options.onError?.(err as Error);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [options]);

  // Initial fetch
  useEffect(() => {
    if (options.enabled) {
      fetchData();
    }
  }, [fetchData, options.enabled]);

  // Auto refresh - but stop if too many consecutive errors
  useEffect(() => {
    if (!options.enabled || !options.refetchInterval || options.refetchInterval <= 0) {
      return;
    }

    // Stop auto-refresh if we have 3 or more consecutive errors
    if (errorCount >= 3) {
      console.log('Stopping auto-refresh due to consecutive errors');
      return;
    }

    const interval = setInterval(() => {
      fetchData(false);
    }, options.refetchInterval);

    return () => clearInterval(interval);
  }, [fetchData, options.enabled, options.refetchInterval, errorCount]);

  const refreshData = useCallback(() => {
    cacheService.delete(CACHE_KEYS.IPL_DATA);
    setErrorCount(0); // Reset error count on manual refresh
    return fetchData(true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    dataSource,
    cacheStatus,
    lastUpdated,
    errorCount,
    fetchData,
    refreshData,
  };
}; 