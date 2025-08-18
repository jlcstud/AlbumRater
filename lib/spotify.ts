let token: { value: string; expiresAt: number } | null = null;

export async function getAccessToken() {
  const now = Date.now();
  if (token && token.expiresAt > now) return token.value;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('Missing Spotify credentials');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });
  const json = await res.json();
  token = {
    value: json.access_token,
    expiresAt: now + json.expires_in * 1000,
  };
  return token.value;
}

export function _clearToken() {
  token = null;
}
