const { createNewGaleri } = require('../controller/galeri')
const upload = require('../util/multer')
const router = require('express').Router()

router.post('/addGaleri', upload.array("photos", 5), createNewGaleri)


module.exports = router