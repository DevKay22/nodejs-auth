const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {
       
        const result = await cloudinary.uploader.upload(filePath);
    } catch (error) {
        console.error('Error while uploading to cloudinary', error);
        throw new Error('Error while uploading to cloudinary');

    }
}

module.exports = {
    uploadToCloudinary
}