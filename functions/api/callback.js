export async function onRequestGet({ request, env }) {
  const code = new URL(request.url).searchParams.get('code');
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = await res.json();
  const ok = Boolean(data.access_token);
  const status = ok ? 'success' : 'error';
  const content = JSON.stringify(
    ok
      ? { token: data.access_token, provider: 'github' }
      : { error: data.error || 'unknown' }
  );
  const html = `<!doctype html><html><body><script>
(function () {
  function receive(e) {
    window.opener.postMessage('authorization:github:${status}:${content}', e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
