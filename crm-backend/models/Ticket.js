const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const TicketSchema = new mongoose.Schema({
    loginID: { type: String, required: true },  // Client Login ID
    companyName: { type: String, required: true }, 
    description: { type: String, required: true }, // Ticket Description
    screenName: { type: String, required: true },
    reporterName: { type: String, required: true },
    base: { type: String, required: true },
    type: { type: String, required: true },
    product: { type: String, required: true},
    reporterContact: { type: String, required: true },
    reporterEmail: { type: String, required: true },
    criticality: { type: String, required: true },
    summary: { type: String, required: true },
   // status: { type: String, enum: ['open', 'in-progress', 'closed'] }, // Ticket Status
    ticketNumber: { type: Number, unique: true }, // Unique Auto-Increment Ticket Number
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Auto-increment for ticketNumber
TicketSchema.plugin(autoIncrement, { inc_field: 'ticketNumber' });

module.exports = mongoose.model('Ticket', TicketSchema);
