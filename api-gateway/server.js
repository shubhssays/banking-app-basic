const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { getServiceUrl } = require('./utils/eurekaHelper');
const config = require('config');

const app = express();
const PORT = config.get('port');

async function setupProxy() {
    // Fetch URLs asynchronously
    const customerServiceUrl = await getServiceUrl(config.get('appIdCustomerService'));
    const accountServiceUrl = await getServiceUrl(config.get('appIdAccountService'));

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