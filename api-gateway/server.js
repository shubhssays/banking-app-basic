require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { getServiceUrl } = require('./utils/eurekaHelper');

const app = express();
const PORT = process.env.PORT || 3000;

async function setupProxy() {
    // Fetch URLs asynchronously
    const customerServiceUrl = await getServiceUrl(process.env.APP_ID_CUSTOMER_SERVICE);
    const accountServiceUrl = await getServiceUrl(process.env.APP_ID_ACCOUNT_SERVICE);

    // Proxy for User Service
    app.use('/accounts', createProxyMiddleware({
        target: accountServiceUrl,
        changeOrigin: true,
        pathRewrite: { '^/accounts': '' },
    }));

    // Proxy for Product Service
    app.use('/customers', createProxyMiddleware({
        target: customerServiceUrl,
        changeOrigin: true,
        pathRewrite: { '^/customers': '' },
    }));

    // Start the server after proxies are set up
    app.listen(PORT, () => {
        console.log(`API Gateway running on http://localhost:${PORT}`);
    });
}

setupProxy().catch(err => {
    console.error('Failed to set up proxies:', err);
});