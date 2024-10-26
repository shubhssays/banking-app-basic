const natsClient = require('./natsClient');
const AccountModel = require('../config/models/accounts.model');

(async () => {
    await natsClient.subscribe(process.env.NATS_TOPIC_CUSTOMER_CREATED, async (data) => {
        try {
            const { customer_id } = JSON.parse(data);
            const newAccount = await AccountModel.create({
                customer_id,
                balance: 0
            });

            await natsClient.publish(process.env.NATS_TOPIC_CUSTOMER_CREATE_STATUS, JSON.stringify({
                status: 'success',
                account_id: newAccount.account_id,
            }));
        } catch (err) {
            console.log('Error in creating account: ', err);
            await natsClient.publish(process.env.NATS_TOPIC_CUSTOMER_CREATE_STATUS, JSON.stringify({
                status: 'error',
                message: 'Error in creating account'
            }));
        }
    }, 0);
})();