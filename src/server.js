//http server module
const http = require('http');
//URL module
const url = require('url');
//query string module
const query = require('querystring');
//response handler files
const responseHandler = require('./responses.js');
//port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//URL Object
const urlStruct = {
    '/': responseHandler.getIndex,
    '/style.css': responseHandler.getCSS,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

//start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});