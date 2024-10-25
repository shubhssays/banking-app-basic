class ClientError extends Error {
    constructor(msg, data) {
        super(msg || 'error');
        this.statusCode = 404;
        this.name = "ClientError";
        this.data = data || null;
    }
}

module.exports = ClientError