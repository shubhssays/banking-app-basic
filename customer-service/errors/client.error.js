class ClientError extends Error {
    constructor(msg, statusCode = 404, data) {
        super(msg || 'error');
        this.statusCode = statusCode;
        this.name = "ClientError";
        this.data = data || null;
    }
}

module.exports = ClientError