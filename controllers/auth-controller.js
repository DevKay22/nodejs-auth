


//register controller
const registerUser = async(req, res) => {
    try {
        
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