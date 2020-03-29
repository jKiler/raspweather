const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/pjp-api', {
      changeOrigin: true,
      secure: false,
      target: "http://api.gios.gov.pl",
    })
  );
}