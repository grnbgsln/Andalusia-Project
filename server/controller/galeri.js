const galeriModel = require('../model/galeri')
const cloudinary = require('../util/cloudinary')


const createNewGaleri = async (req, res, next) => {
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
        const saveData = await new galeriModel({
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
const updateContentGaleri = async (req, res, next) => {
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
        const findContent = await galeriModel.findByIdAndUpdate(req.params.id,
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
        const deleteContent = await galeriModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Succes Delete Content"
        })
    } catch (err) {
        next(err)
    }
}
const getAllContent = async (req, res, next) => {
    try {
        const getAllContent = req
    } catch (err) {
        next(err)
    }
}
const getContentbyID = async (req, res, next) => {
    try {
        const getContent = await galeriModel.findById(req.params.id)
        res.status(200).json({
            message: "Succes",
            data: getContent
        })
    } catch (err) {
        next(err)
    }
}
module.exports = { createNewGaleri, updateContentGaleri, deleteContent, getContentbyID }