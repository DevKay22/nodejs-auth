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

const changePassword = async (req, res){
    try {
        const userId = req.userInfo.userId;

        //extract old and new password
        const {oldPassword, newPassword} = req.body;
        
        //find the current user logged in
        const user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        //check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'old password is not correct. Pls try again'
            })
        }

        //hash the new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt)

        //update user password
        user.password = newHashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
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