import { ScrapedData } from '../../types';
import { API_CONFIG, ERROR_MESSAGES } from '../constants/config';
import { handleError, isNetworkError } from '../utils';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
  cacheStatus?: 'hit' | 'miss' | 'fallback';
  cacheAge?: number;
}

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      if (isNetworkError(error)) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }

      throw new Error(handleError(error));
    }
  }

  async fetchIPLData(): Promise<ApiResponse<ScrapedData>> {
    return this.request<ScrapedData>(API_CONFIG.ENDPOINTS.SCRAPE);
  }

  async fetchWithRetry<T>(
    endpoint: string,
    retries: number = 3,
    delay: number = 1000
  ): Promise<ApiResponse<T>> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.request<T>(endpoint);
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
    
    throw new Error('Max retries exceeded');
  }
}

export const apiService = new ApiService();
export default apiService; 