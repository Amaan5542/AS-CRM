const express = require('express');
const { login } = require('../Controllers/AuthController');
const router = express.Router();
const { createUser} = require('../Controllers/adminController');
const { authenticateToken, adminOnly } = require('../Middlewares/authMiddleware');
const ticketController  = require('../Controllers/TicketController');

//User Login
router.post('/login', login);


// Create User (Admin Only)
router.post('/create-user', authenticateToken, adminOnly, createUser);

//Create Ticket
router.post('/create', ticketController.createTicket);

// Get all tickets for a client
router.get('/my-tickets', ticketController.getClientTickets);

router.get('/tickets-details/:ticketNumber', ticketController.getTickets);

router.get('/tickets/:ticketNumber', ticketController.getTicketByNumber);
 
router.get('/company/:ticketNumber', ticketController.getCompanyTickets);
module.exports = router;
