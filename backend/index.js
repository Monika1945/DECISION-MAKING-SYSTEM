// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// CORS configuration: allow your frontend URL only
app.use(cors({
    origin: 'https://decision-making-system-eight.vercel.app', // <-- your Vercel frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/evaluation', require('./routes/evaluationRoutes'));

// Serve frontend in production (optional if you want full-stack deployment)
/*if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}*/

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));