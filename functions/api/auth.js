export async function onRequestGet({ env }) {
  const params = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    scope: 'repo,user',
  });
  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  );
}
