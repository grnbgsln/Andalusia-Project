const { createBooking, getDateBooking, createFakeBooking, updatedetailBooking } = require('../controller/booking')

const Router = require('express').Router()

Router.post('/add', createBooking)
Router.get('/getdate', getDateBooking)
Router.post('/createBooking', createFakeBooking)
Router.post('/updateBooking/:id', updatedetailBooking)

module.exports = Router