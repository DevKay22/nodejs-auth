const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async(req, res) => {
    try {
        //check if file is misssing in req object
        if(!req.file) {
            res.status(400).json({
                success: false,
                message : 'File is required. Please upload an image'
            })
        }

        //if not missing, upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path)


        //store the image url and public id along with the uploaded user id in the databse
        const newlyUpdatedImage  = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        await newlyUpdatedImage.save();

        //delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUpdatedImage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}


//get the images
const fetchImagesController = async(req, res) => {
    try {
       const images = await Image.find({})

       if(images){
            res.status(200).json({
                success: true,
                message: 'Fetched Images successfully',
                data: images
            })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}

//delete image
const deleteImageController = async (req, res) => {
     try {
        const getCurrentImageIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentImageIdOfImageToBeDeleted);
        if(!image) {
           return res.status(404).json({
                success: false,
                message: 'Image not found'
           })
        }

        //check if the image is uploaded by the current user who's trying to delete this image
        if(image.uploadedBy.toString() !==userId) {
            return res.status(404).json({
                success: false,
                message: 'You are not authorized to delete this iage'
            })
        }

        //delete this image from your cloudinary storage
        await cloudinary.uploader.destroy(image.publicId);

        //delete the image from mongodb database
        await Image.findByIdAndUpdate(getCurrentImageIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        })

    }  catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }
}

module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController
};