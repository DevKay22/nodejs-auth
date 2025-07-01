const express = require('express');
const router = express.Router();


router.get('/home', (req, res) => {
    res.json({
        mmessage: 'Welcome to the home page'
    })
})

module.exports = router