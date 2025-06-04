// src/middleware/withKvCache.js
export function withKvCache(handler, { ttl = 7200 } = {}) {
  return async ({ req, env }) => {

    // Build cache key
    const url = new URL(req.url);
    // Sort parameters by key to ensure consistent cache keys
    const sorted = [...url.searchParams.entries()]
      .sort(([a], [b]) => a.localeCompare(b));
    const key = `cache:${url.pathname}?${new URLSearchParams(sorted)}`;

    // Return cached response if exists
    const hit = await env.CARDS_CACHE_KV.get(key);
    if (hit) {
      return new Response(hit, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'X-Cache': 'HIT',
          'Cache-Key': key
        }
      });
    }

    // Run the real handler
    const res = await handler({ req, env });

    // Cache the request
    if (
      res.status === 200 &&
      res.headers.get('Content-Type')?.includes('image/svg+xml')
    ) {
      // text() consumes the body, so clone first
      const body = await res.clone().text();
      await env.CARDS_CACHE_KV.put(key, body, { expirationTtl: ttl });
    }

    return res;
  };
}
