const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Tickets = require("../../models/Tickets");

// @route GET api/tickets/test
// @description tests tickets route
// @access Public
router.get("/test", (req, res) => res.send("ticket route testing!"));

// @route GET api/tickets/open-tickets
// @description Get all open tickets
// @access Public
router.get("/view-open-tickets", (req, res) => {
  Tickets.find({ ticketStatus: "open" })
    .then((tickets) => {
      tickets && tickets.length > 0
        ? res.json(tickets)
        : res.send({ errorMessage: "Open Tickets not available" });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ errorMessage: "Error while fetching open tickets" })
    );
});

// @route GET api/tickets/close-tickets
// @description Get all close tickets
// @access Public
router.get("/view-close-tickets", (req, res) => {
  Tickets.find({ ticketStatus: "close" })
    .then((tickets) => {
      tickets && tickets.length > 0
        ? res.json(tickets)
        : res.send({ message: "Booked Tickets not found" });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ errorMessage: "Error while fetching Close Tickets" })
    );
});

// @route GET api/tickets/ticket-status/:id
// @description Get ticket status by ticket id
// @access Public
router.get("/ticket-status/:id", (req, res) => {
  Tickets.findById(req.params.id)
    .then((ticket) => {
      res.json({ ticketStatus: ticket.ticketStatus });
    })
    .catch((err) =>
      res
        .status(404)
        .json({ errorMessage: "No ticket found for given ticket id" })
    );
});

// @route POST api/tickets/
// @description Create Ticket
// @access Public
router.post("/", (req, res) => {
  Tickets.findOne({ seatNo: req.body.seatNo, busNo: req.body.busNo }).then(
    (ticket) => {
      if (ticket && Object.keys(ticket).length === 0) {
        if (req.body.ticketStatus === "close") {
          req.body["bookingDate"] = new Date();
        }
        Tickets.create(req.body)
          .then((ticket) =>
            res.json({
              message: "Created successfully",
              status: 200,
              response: JSON.stringify(ticket),
            })
          )
          .catch((err) =>
            res
              .status(400)
              .json({ error: "Unable to create new entry in the Database" })
          );
      } else {
        res.send({
          errorMessage:
            "Ticket with seatNo and BusNo already present. Try updating ticket.",
        });
      }
    }
  );
});

// @route PUT api/tickets/:id
// @description Create/Update Ticket
// @access Public
router.put("/:id", (req, res) => {
  if (req.body.ticketStatus === "close" && req.body["passengerDetails"]) {
    req.body["bookingDate"] = new Date();
  }
  Tickets.findByIdAndUpdate(req.params.id, req.body)
    .then((ticket) =>
      res.json({
        message: "Ticket Updated successfully",
        status: 200,
        response: JSON.stringify(ticket),
      })
    )
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/tickets/passenger-details/:id
// @description Get passenger details by ticket id
// @access Public
router.get("/passenger-details/:id", (req, res) => {
  Tickets.findById(req.params.id)
    .then((ticket) => {
      if(Object.keys(ticket).length>0 && ticket.passengerDetails){
        res.json({ status: 200, passengerDetails: ticket.passengerDetails });
      }else{
        res.send({message: "Passenger Details not found with provided ticket id"})
      }
      
    })
    .catch((err) =>
      res.status(404).json({ errorMessage: "No ticket found with given id" })
    );
});
module.exports = router;
