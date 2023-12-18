const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Routers
const tasksRouter = require('./routes/tasks');
const categoriesRouter = require('./routes/categories');

// Use routers
app.use('/tasks', tasksRouter);
app.use('/categories', categoriesRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Default route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// HTTPS certificate setup
const privateKey = fs.readFileSync('C:/Users/jackm/Desktop/TaskManager/ssl/mykey.key', 'utf8');
const certificate = fs.readFileSync('C:/Users/jackm/Desktop/TaskManager/ssl/localhost.cer', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// HTTPS server setup
const httpsServer = https.createServer(credentials, app);

// Server port setup
const PORT = process.env.PORT || 5000;
httpsServer.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on https://127.0.0.1:${PORT}`);
});
