require('dotenv').config();
const { Eureka } = require('eureka-js-client');

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
        host: 'localhost', // Host where Eureka server is running
        port: 8761, // Port where Eureka server is running
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

module.exports = eurekaClient;