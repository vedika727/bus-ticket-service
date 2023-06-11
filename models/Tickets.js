
const mongoose = require('mongoose');

const TicketsSchema = new mongoose.Schema({
  seatNo: {
    type: Number,
    required: true
  },
  busNo: {
    type: String,
    required: true
  },
  ticketStatus: {
    type: String,
    required: true,
    default: "close"
  },
  bookingDate: {
    type: Date
  },
  passengerDetails: {
    type: Object
  }
});

module.exports = Tickets = mongoose.model('tickets', TicketsSchema);