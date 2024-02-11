//file system module
const fs = require('fs');
//load files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

//response function
const respond = (request, response, status, content, type) => {
    console.log(content);
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};
//handles HTML
const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
  };
//handles CSS
const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
  };

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    pageName: 'Success',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responseJSON);
  respond(request, response, 200, responseString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'This request has the required parameters',
      pageName: 'Bad Request',
    };
    if (!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query parameter set to true';
        responseJSON.id = 'badRequest';

        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 400, responseXML, 'text/xml');
        }
        const responseString = JSON.stringify(responseJSON);
        return respond(request, response, 400, responseString, 'application/json');
    }
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 200, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 200, responseString, 'application/json');
  };

const unauthorized = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'This request has the required parameters',
      pageName: 'Unauthorized',
    };
    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';

        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
            responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 401, responseXML, 'text/xml');
        }
        const responseString = JSON.stringify(responseJSON);
        return respond(request, response, 401, responseString, 'application/json');
    }
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 200, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 200, responseString, 'application/json');
};

  const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'You do not have access to this content',
      id: 'forbidden',
      pageName: 'Forbidden',
    };
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 403, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 403, responseString, 'application/json');
  };

  const internal = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'Internal Service Error. Something went wrong',
      id: 'internalError',
      pageName: 'Internal Service Error',
    };
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 500, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 500, responseString, 'application/json');
  };

  const notImplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
      pageName: 'Not Implemented',
    };
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 501, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 501, responseString, 'application/json');
  };
  
  const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
      pageName: 'Resource Not Found',
    };
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 404, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responseJSON);
    respond(request, response, 404, responseString, 'application/json');
  };
//export
module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};