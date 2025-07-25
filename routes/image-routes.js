const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const {
  uploadImageController,
  fetchImagesController,
  deleteImageController
} = require('../controllers/image-controller');

const router = express.Router();

// Upload image (admin only)
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('image'),
  uploadImageController
);

// Get all images (authenticated users)
 router.get('/get', authMiddleware, fetchImagesController);

 //delete image route
 router.delete('/:id', authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;
