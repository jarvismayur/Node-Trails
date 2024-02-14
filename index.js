const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
//const productRoutes = require('./routes/productRoutes');
//const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());


// Routes
app.use('/api/users', userRoutes);
//app.use('/api/products', productRoutes);
//app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/my_node_project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start server
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
