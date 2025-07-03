const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');

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


module.exports = {
    uploadImageController,
    fetchImagesController
};