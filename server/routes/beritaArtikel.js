const { createNewContent, updateContent, getContentbyID, deleteContent } = require('../controller/beritaArtikel')

const router = require('express').Router()

router.post('/add', createNewContent)
router.post('/update', updateContent)
router.get('/:id', getContentbyID)
router.post('/delete', deleteContent)

module.exports = router