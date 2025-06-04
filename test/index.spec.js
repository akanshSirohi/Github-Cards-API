import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Help route', () => {
  it('returns cards info (unit style)', async () => {
    const request = new Request(env.BASE_URL + '/');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    const data = await response.json();
    expect(data).toHaveProperty('themes');
  });

  it('returns cards info (integration style)', async () => {
    const response = await SELF.fetch(env.BASE_URL + '/');
    const data = await response.json();
    expect(data).toHaveProperty('themes');
  });
});
