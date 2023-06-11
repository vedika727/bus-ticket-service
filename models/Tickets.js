const mongoose = require("mongoose");

const TicketsSchema = new mongoose.Schema({
//   _id: mongoose.String,
  seatNo: {
    type: Number,
    required: true,
  },
  busNo: {
    type: String,
    required: true,
  },
  ticketStatus: {
    type: String,
    required: true,
    default: "open",
  },
  bookingDate: {
    type: Date,
  },
  passengerDetails: {
    type: Object,
  },
});

module.exports = Tickets = mongoose.model("tickets", TicketsSchema);
