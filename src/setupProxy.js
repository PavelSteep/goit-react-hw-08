const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'https://connections-api.goit.global/',
      changeOrigin: true,
      secure: false, // Если сервер использует https, установить true
    })
  );
};
