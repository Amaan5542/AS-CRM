const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User'); // User model ko import karein

// Database connection
mongoose.connect('mongodb://localhost:27017/ASCT_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log('MongoDB connection error: ', err);
});

const createAdminUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash('Admin1', 10); // Hashing the password
        const newAdmin = new User({
            loginID: 'AD0001',
            password: hashedPassword,  // Hashed password
            role: 'admin',
        });

        await newAdmin.save();
        console.log('Admin user created');
    } catch (err) {
        console.log('Error creating admin user:', err);
    }
};

createAdminUser().catch(err => console.log(err));
