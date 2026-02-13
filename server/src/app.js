const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDatabase = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [
        process.env.CORS_ORIGIN || 'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use('/api/v1', apiRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV}`);
            console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN}`);
            console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error('💥 UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});


startServer();

module.exports = app;
