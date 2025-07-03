const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

const router = express.Router;

//upload image
router.post('/upload', authMiddleware, adminMiddleware, (req, res)=> {

})



//Get all the images





module.exports = router