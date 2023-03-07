const midtrans = require('../util/midtrans')
const test = require('../model/test')

const testMidtrans = async (req, res, next) => {
    await midtrans.transaction.approve("e0fa7eb6-be32-49a4-a34d-de2c38ba0ced", { fraud_status: 'challange' })
        .then(response => {
            console.log('Transaction approved:', response.ApiResponse);
        })
        .catch(error => {
            console.log('Error approving transaction:', error);
        });
}

module.exports = { testMidtrans }