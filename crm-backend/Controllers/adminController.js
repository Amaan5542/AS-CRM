const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { name, email, role, companyName, loginID, password } = req.body;

    try {
        // Validate required fields
        if (!loginID || !password) {
            return res.status(400).json({ message: "Login ID and Password are required" });
        }

        // Validate that companyID is provided for clients
        if (role === 'client' && !companyName) {
            return res.status(400).json({ message: "Company ID is required for clients" });
        }

        // Check for duplicate client for the same companyID
        if (role === 'client') {
            const existingClient = await User.findOne({ role: 'client', companyName });
            if (existingClient) {
                return res.status(400).json({ message: `Client for company ID '${companyName}' already exists.` });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            role,
            companyName: role === 'client' ? companyName : undefined,
            loginID,
            password 
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            loginID,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

