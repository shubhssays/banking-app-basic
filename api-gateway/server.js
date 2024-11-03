require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Logging middleware
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Proxy for User Service
app.use('/accounts', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/accounts': '' },
}));

// Proxy for Product Service
app.use('/customers', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/customers': '' }, 
}));

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on http://localhost:${process.env.PORT}`);
});