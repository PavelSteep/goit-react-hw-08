const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'https://goit-task-manager.herokuapp.com',
      changeOrigin: true,
      secure: false, // Если сервер использует https, установить true
    })
  );
};
