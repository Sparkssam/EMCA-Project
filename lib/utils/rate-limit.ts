import { LRUCache } from 'lru-cache'

const rateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60 * 10, // 10 minutes
})

export function rateLimit(identifier: string, limit: number = 5) {
  const count = rateLimitCache.get(identifier) || 0
  if (count >= limit) {
    throw new Error('Rate limit exceeded. Please try again in 10 minutes.')
  }
  rateLimitCache.set(identifier, count + 1)
}
