// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const app = express();

// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/VaxiCare");
//         console.log('Connected to database')
//     } catch(error)  {
//         throw error;
//     }
// }

app.listen(8800,() => {
    connectMongoDB();
    console.log("Connected to backend server!")
});

app.use(bodyParser.json());