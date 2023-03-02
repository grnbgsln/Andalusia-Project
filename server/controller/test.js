const midtrans = require('../util/midtrans')
const test = require('../model/test')

const testMidtrans = async (req, res, next) => {
    try {
        let bodyReqMidtrans = {
            "transaction_details": {
                "gross_amount": 21000,
                "order_id": "123456"
            },
            "customer_details": {
                "email": "test@yopmail.com",
                "first_name": "gerin",
                "phone": 123
            },
            "item_details": [
                {
                    "price": 21000,
                    "quantity": 1,
                    "name": "booking gedung",
                }
            ],
        }
        let newbodyReqMidtrans = {
            ...bodyReqMidtrans,
            "bank_transfer": {
                "bank": "bca",
                "va_number": "12345678901"
            }, "payment_type": "bank_transfer"
        }
        console.log(newbodyReqMidtrans)
        const test = await midtrans.charge(newbodyReqMidtrans)
        console.log(test)

    } catch (err) {
        next(err)
    }
}

module.exports = { testMidtrans }