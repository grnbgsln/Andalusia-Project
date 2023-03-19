const { createBooking, getDateBooking, createFakeBooking, updatedetailBooking, confirmationFakeBooking, testing } = require('../controller/booking')
const { testMidtrans } = require('../controller/test')

const Router = require('express').Router()

Router.post('/add', createBooking)
Router.get('/getdate', getDateBooking)
Router.post('/createBooking', createFakeBooking)
Router.post('/updateBooking/:id', updatedetailBooking)
Router.post("/confirmationAdmin/:id", confirmationFakeBooking)
Router.post("/test", testing)

module.exports = Router