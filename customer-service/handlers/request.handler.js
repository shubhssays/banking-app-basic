

const statusCodeMapper = {
    'GET': 200,
    'POST': 201,
    'PUT': 202,
    'DELETE': 202
}

class RequestHandler {
    static successHandler(request, response, data) {
        let successCode = statusCodeMapper[request.method] || 200;
        let message = data?.message || undefined;
        delete data?.message;
        const responseData = { message, data, status: 'success' };
        return response.status(successCode).send(responseData);
    }

    static errorHandler({request, response, data = null, error, code}) {
        const responseData = { message: error?.toString() || 'Internal Server Error', data, status: 'failed' };
        return response.status(code || 500).send(responseData);
    }

    static validationHandler(request, response, data = null, error) {
        const responseData = { message: error.toString(), data, status: 'failed' };
        return response.status(400).send(responseData);
    }
}

module.exports = RequestHandler;