const SOURCES = {
  'vena-header': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/846a303db5b2fcc00f354cb79258a4ae4842cd0a/header.jpg?t=1780866011',
  'vena-1': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/extras/e7f6992bc8e8e5d64c1abf65b8e1bef9.avif?t=1780866011',
  'vena-2': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/extras/23336b2169b9cc03dc38b6e896ef66b2.avif?t=1780866011',
  'wanderburg-header': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3624140/a0a68815aac3899476a7365a04771e731008a406/header.jpg?t=1776354662',
  'wanderburg-1': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3624140/extras/9ee8a002038fb47b68c47a6168182349.avif?t=1776354662',
  'wanderburg-2': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3624140/extras/e26fc58ea12a3dadbc4fb82bb2545f82.avif?t=1776354662',
};

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const source = SOURCES[url.searchParams.get('key') ?? ''];

  if (!source) {
    return new Response('Not found', { status: 404 });
  }

  const response = await fetch(source, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });

  if (!response.ok) {
    return new Response(`Upstream error: ${response.status}`, { status: 502 });
  }

  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  return new Response(response.body, { status: 200, headers });
}
