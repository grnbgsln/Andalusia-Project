const midtransClient = require('midtrans-client');
const dotenv = require("dotenv")
dotenv.config()
// Create Core API instance
let coreApiMidtrans = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY_MIDTRANS,
    clientKey: process.env.CLOUD_KEY_MIDTRANS
});

module.exports = coreApiMidtrans