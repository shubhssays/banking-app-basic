require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const NatsClient = require("./nats/natsClient");

//set up express app
const app = express();

//Log requests to the console
app.use(logger("dev"));

//parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/health", (req, res) => {
    res.status(200).send({
        message: "Account service is up and running",
    });
});

app.use("/accounts", require("./routes/accounts.routes"));

// this should be the last route
require("./routes/error.routes")(app);

async function initNats() {
    try {
        await NatsClient.connect();

        // Subscribe to a subject
        NatsClient.subscribe('as', (msg) => {
            console.log('Account Service Nats server is online')
        });

        // Publish a message
        await NatsClient.publish('as', 'Hello, NATS!');

    } catch (error) {
        console.error('Account Service Nats server cannot be connected', error);
    }
}

initNats();

app.listen(process.env.PORT, () => {
    console.log(`Account Service is running on PORT ${process.env.PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.error("There was an uncaught error", error);
    process.exit(1);
});

module.exports = app;