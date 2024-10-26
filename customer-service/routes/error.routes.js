const RequestHandler = require("../handlers/request.handler");
const ClientError = require("../errors/client.error");
const GeneralError = require("../errors/general.error");
const ServerError = require("../errors/server.error");

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
        } if (error instanceof ServerError) {
            return RequestHandler.validationHandler({
                request,
                response,
                data: {},
                error: { message: 'Internal server error' },
                code: 500
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