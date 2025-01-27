const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { loginID, password } = req.body;
    // Log the request body
    //console.log("Request Body Received:", req.body);
  try {
    // Check if user exists
    const user = await User.findOne({ loginID });
    if (!user) {
      console.log(`Login attempt failed. User not found: ${loginID}`);
      return res.status(404).json({ message: 'Invalid LoginID' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login attempt failed. Password mismatch for loginID: ${loginID}`);
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate JWT token with companyID included instead of companyName
    const token = jwt.sign(
      { id: user._id, loginID: user.loginID, role: user.role, companyName: user.companyName },  
      process.env.JWT_SECRET,
    );

    // Respond with token and user role
    res.json({ token, role: user.role, companyName: user.companyName });  
  } catch (err) {
    console.error(`Server error during login for loginID: ${loginID}`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
