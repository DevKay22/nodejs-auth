const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb successfully connected');
    } catch (error) {
        console.log('Mongodb connection failed');
        process.exit(1)
    }
}

module.exports= connectDB;