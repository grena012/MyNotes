const mongoose = require('mongoose');




const mongoURI = 'mongodb://127.0.0.1:27017/mysmalldiary';

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(
        console.log('connected to mongo successfully')
    )
}

module.exports = connectToMongo;
