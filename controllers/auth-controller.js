const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const {username, password} = req.body;

        //find if the current user exist or not in the database
        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({
                ssuccess: false,
                message : "User does not exist"
            })
        }

        //check if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
             return res.status(400).json({
                ssuccess: false,
                message : "Invalid credentials"
            });
        }

        //create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        })

        res.status(200).json({
            success : true,
            message : 'Logged in successful',
            accessToken
        })

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