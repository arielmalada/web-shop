const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger');
const responseJSON = require('./utils/response');
const router = require('./utils/router')
const http = require("http");

const server = http.createServer((request, response) => {
    const reqURL = request.url;
    const reqMethod = request.method;
    switch (reqMethod) {
        case 'GET': {
            const route = router.routes.find(
                (route) => route.method === 'GET' && route.path === reqURL
            );
            if (route) {
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
