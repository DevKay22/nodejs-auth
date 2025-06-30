const User = require('../models/User');
const bcrypt = require('bcryptjs')


//register controller
const registerUser = async(req, res) => {
    try {

        //extract user information from our request body
        const { username, email, password, role} = req.body;

        //check if the user already exists in the database
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});
        if (checkExistingUser) {
            res.status(400).json({
                succcess: false,
                message : 'User already exist either with same username or email'
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save in your database
        const newlyCreatedUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'

        })

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success : true,
                message : 'User registered successfully',
                data : newlyCreatedUser
            })
        } else {
            res.status(400).json({
                success : false,
                message : 'Unable to register user'
            })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Some error occured! Please try again'
        })
    }
}


//login controller
const loginUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong, Please try again'
        })
    }
}


module.exports = {
    registerUser,
    loginUser
}