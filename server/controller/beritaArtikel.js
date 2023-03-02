const cloudinary = require('../util/cloudinary')
const beritaContent = require('..//model/beritaArtikel')
const axios = require("axios");


//test 
const createNewContent = async (req, res, next) => {
    try {
        let images = req.files
        let uploadImage = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i].path);
            uploadImage.push({
                _id: result.public_id,
                url: result.url,
            });
        }
        const saveData = await new beritaContent({
            ...req.body,
            images: uploadImage
        }).save()

        return res.status(200).json({
            message: "Succes",
            data: saveData
        })

    } catch (err) {
        next(err)
    }
}
const updateContent = async (req, res, next) => {
    try {
        let images = req.files
        let uploadImage = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i].path);
            uploadImage.push({
                _id: result.public_id,
                url: result.url,
            });
        }
        const findContent = await beritaContent.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    ...req.body,
                    images: uploadImages,
                    updated_by: req.body.updated_by
                }
            }
        )
        res.status(200).json({
            message: "Succes Update Content",
            data: findContent
        })
    } catch (err) {
        next(err)
    }
}
const deleteContent = async (req, res, next) => {
    try {
        const deleteContent = await beritaContent.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Succes Delete Content"
        })
    } catch (err) {
        next(err)
    }
}
const getContentbyID = async (req, res, next) => {
    try {
        const getContent = await beritaContent.findById(req.params.id)
       

        res.status(200).json({
            message: "Succes",
            data: getContent
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { createNewContent, updateContent, deleteContent, getContentbyID }