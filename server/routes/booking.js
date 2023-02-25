const { createBooking, getDateBooking } = require('../controller/booking')

const Router = require('express').Router()

Router.post('/add', createBooking)
Router.get('/getdate', getDateBooking)

module.exports = Router