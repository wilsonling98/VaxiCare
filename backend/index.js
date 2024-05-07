import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import vaccinationRoute from './routes/vaccine_applicant.js';
import vaccineBatchRoute from './routes/vaccine_batch.js';
import cors from 'cors';

const app = express();
dotenv.config();

// Middleware
app.use(cors({
    origin: 'http://localhost:4500', // Specify your Angular application's URL
    credentials: true
}));


app.use(express.json());

// Routes
app.use('/backend/auth', authRoute);
app.use('/backend/vaccination',vaccinationRoute);
app.use('/backend/vaccineBatch',vaccineBatchRoute);

// Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        data: null
    });
});

// MongoDB Connection
const connMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        console.error("Connection to MongoDB failed.");
        process.exit(1); // Exit the process if MongoDB connection fails
    }
}

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connMongoDB();
    console.log(`Server is running on port ${PORT}`);
});

