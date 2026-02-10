import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redisClient from '../redisClient';

const sendRedisCommand = async (...args: string[]) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return (await redisClient.sendCommand(args)) as any;
};

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: sendRedisCommand, 
  }),
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    message: 'Too many requests, please try again later.',
  },
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: sendRedisCommand,
  }),
  windowMs: 60 * 60 * 1000,
  limit: 20,
  message: { 
    message: 'Too many login attempts, account temporarily blocked.' 
  },
});