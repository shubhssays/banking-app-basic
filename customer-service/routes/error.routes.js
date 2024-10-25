const RequestHandler = require("../handlers/request.handler");
const ClientError = require("../errors/client.error");

function errorRoutes(app) {
    app.use((err, req, res, next) => {
        console.error(err);

        if (err instanceof ClientError) {
            return RequestHandler.validationHandler({
                req,
                res,
                data: err.data,
                error: err
            });
        } else {
            return RequestHandler.errorHandler({
                req,
                res,
                data: err.data,
                error: err,
                code: err?.statusCode || 500
            });
        }
    });
}

module.exports = errorRoutes;