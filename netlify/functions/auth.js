exports.handler = async () => {
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    scope: 'repo,user',
  });
  return {
    statusCode: 302,
    headers: { Location: `https://github.com/login/oauth/authorize?${params}` },
  };
};
