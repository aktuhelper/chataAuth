import express from 'express';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import authrouter from './Routes/authroutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userroute.js';
import path from 'path';

const app = express();
const _dirname = path.resolve();
const port = process.env.PORT || 4000;

// Database connection
connectDB();

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173'];

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes setup
app.use('/api/auth', authrouter);
app.use('/api/user', userRouter);

// Test API route
app.get('/', (req, res) => {
    // Automatically redirect users to the register page
    res.redirect('/login');
});

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(_dirname, 'client', 'dist')));

// For all routes that are not defined above, serve index.html
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'));
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
