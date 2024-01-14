require('./app')
const config = require('./utils/config')
const responseJSON = require('./utils/response');
const router = require('./utils/router')
const http = require("http");


//handle matching path with id with request url
const matchPathWithId = (path, url) => {
    const pathParts = path.split('/');
    const urlParts = url.split('/');
    if (pathParts.length !== urlParts.length) {
        return false;
    }

    for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] !== urlParts[i] && pathParts[i][0] !== ':') {
            return false;
        }
    }

    return true;
};

const buildParams = (route, reqURL)=> {
    const params = {};
    const pathParts = route.path.split('/');
    const urlParts = reqURL.split('/');
    for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i][0] === ':') {
            params[pathParts[i].slice(1)] = urlParts[i];
        }
    }
    return params;
}

const parseBody = (request) => {
    return new Promise((resolve, reject) => {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch (error) {
                reject(error);
            }
        });
        request.on('error', (error) => {
            reject(error);
        });
    });
}

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case 'GET': {
            const route = router.routes.find(
                (route) => route.method === 'GET' && matchPathWithId(route.path, reqURL)
            );
            if (route) {
                const params = buildParams(route, reqURL);
                request.params = params;
                route.handler(request, response);
            } else {
                responseJSON(response, 404, { message: 'Not Found' });
            }
            break;
        }
        case 'POST': {
            const route = router.routes.find(
                (route) => route.method === 'POST' && route.path === reqURL
            );
            if (route) {
                parseBody(request)
                    .then((body) => {
                        request.body = body;
                        route.handler(request, response);
                    })
                    .catch((error) => {
                        responseJSON(response, 400, { message: error.message });
                    });
            } else {
                responseJSON(response, 404, { message: 'Not Found' });
            }
            break;
        }
        case 'PUT': {
            const route = router.routes.find(
                (route) => route.method === 'PUT' && matchPathWithId(route.path, reqURL)
            );
            if (route) {
                const params = buildParams(route, reqURL);
                parseBody(request)
                    .then((body) => {
                        request.params = params;
                        request.body = body;
                        route.handler(request, response);
                    })
                    .catch((error) => {
                        responseJSON(response, 400, { message: error.message });
                    });
            } else {
                responseJSON(response, 404, { message: 'Not Found' });
            }
            break;
        }
        case 'DELETE': {
            const route = router.routes.find(
                (route) => route.method === 'DELETE' && matchPathWithId(route.path, reqURL)
            );
            if (route) {
                const params = buildParams(route, reqURL);
                request.params = params;
                route.handler(request, response);
            } else {
                responseJSON(response, 404, { message: 'Not Found' });
            }
            break;
        }
        default: {
            break
        }
    }


});

server.listen(config.PORT, () => {
    console.log("Server is running on Port:", config.PORT);
});
