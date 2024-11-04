
const Axios = require('./axios');
const axios = new Axios(process.env.EUREKA_SERVER_URL);

async function getServiceUrl(serviceName, pickOne = true) {
    const axios = new Axios(`http://${process.env.EUREKA_SERVER_HOST}:${process.env.EUREKA_SERVER_PORT}`);
    const response = await axios.get(`/eureka/apps/${serviceName}`);
    if(pickOne) {
        return `http://${response.application.instance[0].hostName}:${response.application.instance[0].port['$']}`;
    }
    return response;
}

module.exports = {
    getServiceUrl
}