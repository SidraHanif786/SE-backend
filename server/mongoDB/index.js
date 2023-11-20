const mongoose = require('mongoose');

const mongoDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected `);
    } catch (error) {
        console.error(`ERROR in DB Connection: ${error.message}`);
        process.exit(1);
    }
}

module.exports = mongoDB;