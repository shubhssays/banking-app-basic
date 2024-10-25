const RequestHandler = require("../handlers/request.handler");
const ClientError = require("../errors/client.error");

function errorRoutes(app) {
    app.use((error, request, response, next) => {
        console.error(error);

        if (error instanceof ClientError) {
            return RequestHandler.validationHandler({
                request,
                response,
                data: error.data,
                error: error,
                code: error?.statusCode
            });
        } else {
            return RequestHandler.errorHandler({
                request,
                response,
                data: error.data,
                error: error,
                code: error?.statusCode
            });
        }
    });
}

module.exports = errorRoutes;