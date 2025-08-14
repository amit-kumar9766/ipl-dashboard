import { CacheService } from '../types';
import { API_CONFIG } from '../constants/config';

interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

class CacheServiceImpl implements CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL: number;

  constructor(defaultTTL: number = API_CONFIG.CACHE_DURATION) {
    this.defaultTTL = defaultTTL;
    this.startCleanupInterval();
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - item.timestamp > item.ttl;

    if (isExpired) {
      this.delete(key);
      return null;
    }

    return item.value;
  }

  set<T>(key: string, value: T, ttl?: number): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };

    this.cache.set(key, item);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key) && this.get(key) !== null;
  }

  getSize(): number {
    return this.cache.size;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.getSize(),
      keys: this.getKeys(),
    };
  }

  private startCleanupInterval(): void {
    // Clean up expired items every 5 minutes
    setInterval(() => {
      const now = Date.now();
      const expiredKeys: string[] = [];

      this.cache.forEach((item, key) => {
        if (now - item.timestamp > item.ttl) {
          expiredKeys.push(key);
        }
      });

      expiredKeys.forEach(key => this.delete(key));
    }, 5 * 60 * 1000);
  }
}

export const cacheService = new CacheServiceImpl();
export default cacheService; 