type CacheItem<T> = {
  value: T;
  expiry: number;
};

class Cache {
  static set<T>(key: string, value: T, ttl: number) {
    const expiry = Date.now() + ttl;
    const cacheItem: CacheItem<T> = { value, expiry };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cacheItem: CacheItem<T> = JSON.parse(item);
    if (Date.now() > cacheItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheItem.value;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default Cache;
