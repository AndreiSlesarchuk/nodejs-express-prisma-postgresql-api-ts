import redisClient from '../redisClient';

export class CacheService {
  async getOrSet<T>(key: string, fetchFn: () => Promise<T>, duration = 3600): Promise<T> {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log(`[Cache] Hit: ${key}`);
      return JSON.parse(cachedData);
    }

    console.log(`[Cache] Miss: ${key}. Fetching from DB...`);
    const freshData = await fetchFn();

    if (freshData !== null && freshData !== undefined) {
      await redisClient.setEx(key, duration, JSON.stringify(freshData));
    }

    return freshData;
  }

  async delete(key: string) {
    await redisClient.del(key);
    console.log(`[Cache] Deleted: ${key}`);
  }

  async deleteByPattern(pattern: string) {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`[Cache] Pattern ${pattern} cleared (${keys.length} keys)`);
    }
  }
}

export const cacheService = new CacheService();