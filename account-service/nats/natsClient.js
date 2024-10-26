// NatsClient.js
const { connect, StringCodec } = require('nats');

class NatsClient {
    static instance;

    constructor() {
        if (NatsClient.instance) {
            return NatsClient.instance;
        }

        this.nc = null;
        this.sc = StringCodec(); // For encoding/decoding messages
        NatsClient.instance = this;
    }

    async connect(serverUrl = 'nats://localhost:4222') {
        if (!this.nc) {
            this.nc = await connect({ servers: serverUrl });
            console.log(`Connected to NATS server at ${serverUrl}`);
        }
    }

    async publish(subject, message) {
        if (!this.nc) {
            throw new Error("NATS client is not connected");
        }
        this.nc.publish(subject, this.sc.encode(message));
    }

    async subscribe(subject, callback) {
        if (!this.nc) {
            throw new Error("NATS client is not connected");
        }
        const sub = this.nc.subscribe(subject);
        for await (const msg of sub) {
            callback(this.sc.decode(msg.data));
        }
    }

    async disconnect() {
        if (this.nc) {
            await this.nc.drain();
            this.nc = null;
            console.log("Disconnected from NATS server");
        }
    }
}

module.exports = new NatsClient();
