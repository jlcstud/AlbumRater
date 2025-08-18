import { describe, expect, test, vi, beforeEach } from 'vitest';
import { getAccessToken, _clearToken } from '../lib/spotify';

describe('token caching', () => {
  beforeEach(() => _clearToken());
  test('uses cache', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ access_token: 'abc', expires_in: 3600 }),
    } as any);
    const t1 = await getAccessToken();
    const t2 = await getAccessToken();
    expect(t1).toBe('abc');
    expect(t2).toBe('abc');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fetchMock.mockRestore();
  });
});
