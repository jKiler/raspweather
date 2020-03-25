const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/api', {
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      },
      secure: false,
      target: "http://api.gios.gov.pl",
    })
  );
}