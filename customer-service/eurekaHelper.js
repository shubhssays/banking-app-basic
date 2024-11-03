require('dotenv').config();
const { Eureka } = require('eureka-js-client');
const Axios = require("./utils/axios");

const instanceId = process.env.APP_NAME;
const vipAddress = `${instanceId}-vip`;

console.log('instanceId', instanceId);
console.log('vipAddress', vipAddress);

// Configure the Eureka eurekaClient instance
const eurekaClient = new Eureka({
    instance: {
        app: process.env.APP_NAME, // Name of your service
        instanceId, // Unique ID for the instance
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: `http://localhost:${process.env.PORT}/health/status`, // URL for the health/status page
        port: {
            '$': process.env.PORT, // Port your service is running on
            '@enabled': true,
        },
        vipAddress, // Virtual IP address used for discovery
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn', // Name of your data center, use "MyOwn" if self-hosted
        },
    },
    eureka: {
        // Eureka server configuration
        host: process.env.EUREKA_SERVER_HOST, // Host where Eureka server is running
        port: process.env.EUREKA_SERVER_PORT, // Port where Eureka server is running
        servicePath: '/eureka/apps/', // Default service path
    },
});

// Start the Eureka eurekaClient to register the app with Eureka
eurekaClient.start((error) => {
    console.log('Node.js Eureka eurekaClient started');
    if (error) {
        console.error('Error starting Eureka eurekaClient:', error);
    }
});

async function getServiceUrl(serviceName, pickOne = true) {
    const axios = new Axios(`http://${process.env.EUREKA_SERVER_HOST}:${process.env.EUREKA_SERVER_PORT}`);
    const response = await axios.get(`/eureka/apps/${serviceName}`);
    if(pickOne) {
        return `http://${response.application.instance[0].hostName}:${response.application.instance[0].port['$']}`;
    }
    return response;
}

module.exports = {
    eurekaClient,
    getServiceUrl,
};
