import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379' // 'redis' — it's name of redis container.
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('connected to Redis');
  }
};

export default redisClient;