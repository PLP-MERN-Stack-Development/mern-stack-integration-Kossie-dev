const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const { AppError } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Add CORS middleware BEFORE routes
app.use(cors({
  origin: 'http://localhost:5000', // or your frontend port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;