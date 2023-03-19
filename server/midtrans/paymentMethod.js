

const payment = (type, bankName, paymnet) => {
    console.log(type, bankName, paymnet)
    const newId = paymnet._id.toString();
    let newbodyReqMidtrans;
    let bodyReqMidtrans = {
        transaction_details: {
            gross_amount: 21000,
            order_id: newId,
        },
        customer_details: {
            email: paymnet.email,
            first_name: paymnet.name,
            phone: paymnet.phone,
        },
        item_details: [
            {
                price: 21000,
                quantity: 1,
                name: "booking gedung",
                items: paymnet.items,
            },
        ],
    };

    switch (type) {
        case "bank_transfer":
            newbodyReqMidtrans = {
                payment_type: "bank_transfer",
                ...bodyReqMidtrans,
                bank_transfer: {
                    bank: bankName,
                    va_number: "12345678901",
                },
            };
            break;
        case "gopay":
            newbodyReqMidtrans = {
                payment_type: "gopay",
                ...bodyReqMidtrans,
                gopay: {
                    enable_callback: true,
                    callback_url: "someapps://callback",
                },
            };
            break;
        default:
    }
    console.log(newbodyReqMidtrans)
    return newbodyReqMidtrans
}

module.exports = { payment }