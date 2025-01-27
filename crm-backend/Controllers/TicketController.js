const jwt = require('jsonwebtoken');  // Ensure this is imported at the top
const Ticket = require('../models/Ticket');
const User = require('../models/User');

exports.createTicket = async (req, res) => {
    const { screenName, reporterName, product, description, base, type, reporterContact, reporterEmail, criticality, summary, attachment } = req.body;

    try {
        // Get the JWT token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }

        // Log the token (for debugging)
        console.log("Token received:", token);

        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Log the decoded token (for debugging)
        console.log("Decoded Token:", decodedToken);

        // Extract loginID and companyName from the token
        const { loginID, companyName: decodedCompanyName } = decodedToken;

        // Check if the user exists as a client
        const user = await User.findOne({ loginID, role: 'client', companyName: decodedCompanyName });
        if (!user) {
            return res.status(404).json({ message: "Client not found for the given loginID and companyName" });
        }

        // Log the user found (for debugging)
        console.log("User found:", user);

        // Create the ticket with the description filled by the client
        const ticket = new Ticket({
            loginID,
            screenName,
            reporterName,
            product,
            description,  
            base,
            type,
            reporterContact,
            reporterEmail,
            criticality,
            summary,
            attachment,
            companyName: decodedCompanyName ,
        });

        // Save the ticket to the database, which will automatically assign a ticketNumber
        await ticket.save();

        // Log the ticket created (for debugging)
        console.log("Ticket created:", ticket);

        res.status(201).json({
            message: "Ticket created successfully",
            ticketNumber: ticket.ticketNumber, // Return the generated ticket number
            companyName: ticket.companyName,
            title: `Ticket #${ticket.ticketNumber}`,  // Set title as "Ticket #<ticketNumber>"
        });
    } catch (err) {
        console.error("Error creating ticket:", err);  // Log the error
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.getClientTickets = async (req, res) => {
    try {
        // Get the JWT token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }

        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract loginID and companyName from the token
        const { loginID, companyName } = decodedToken;

        // Fetch tickets for the logged-in client
        const tickets = await Ticket.find({ loginID, companyName }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Tickets retrieved successfully",
            tickets,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

/// Function to fetch ticket details by ticket number
exports.getTickets = async (req, res) => {
    const { ticketNumber } = req.params;
    try {
      const ticket = await Ticket.findOne({ ticketNumber }); // Replace with your database query
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json({ ticket });
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };



////Function to fetch ticket Number in View Ticket by ticket ID
  exports.getTicketByNumber = async (req, res) => {
    const { ticketNumber } = req.params; // Extract ticketNumber from request params
  
    try {
      // Find the ticket by ticketNumber in the database
      const ticket = await Ticket.findOne({ ticketNumber });
  
      // If ticket not found, return 404 error
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Return the found ticket details
      res.status(200).json({ ticket });
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      // Return a server error response
      res.status(500).json({ message: 'An error occurred while fetching the ticket' });
    }
  };

/// company ticket number se search
exports.getCompanyTickets = async (req, res) => {
    const { ticketNumber } = req.params; // Ticket Number from URL
    console.log('Authenticated User:', req.user);
    const user = req.user; // Logged-in user data (from auth middleware)

    

    try {
        // Ensure that the logged-in user is associated with a company
        if (!user || !user.companyName) {
            return res.status(403).json({ message: 'Unauthorized access. No company assigned.' });
        }

        // Find ticket based on ticket number and user's company name
        const ticket = await Ticket.findOne({
            ticketNumber,
            companyName: user.companyName, // Restrict to user's company
        });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized access.' });
        }

        res.status(200).json({ ticket });
    } catch (error) {
        console.error('Error fetching company tickets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
