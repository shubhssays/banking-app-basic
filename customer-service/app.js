const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("config");

//set up express app
const app = express();

const PORT = config.get("port");

//Log requests to the console
app.use(logger("dev"));

//parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// registering app to eureka server
require("./eurekaHelper");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/health/status", (req, res) => {
    res.status(200).send({
        message: "Customer Service is up and running",
    });
});

app.use("/", require("./routes/customers.routes"));

// this should be the last route
require("./routes/error.routes")(app);

app.listen(PORT, () => {
    console.log(`Customer Service is running on PORT ${PORT}`);
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
