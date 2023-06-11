const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../../models/Users");
const Tickets = require("../../models/Tickets");

// @route GET api/users/test
// @description tests tickets route
// @access Public
router.get("/test", (req, res) => res.send("users route testing!"));

// @route GET api/users/reset-server
// @description Reset all close tickets
// @access Public
router.put("/reset-server", (req, res) => {
  Users.findOne({ userName: req.body.userName, isAdmin: true })
    .then((user) => {
      if (Object.keys(user).length > 0) {
        Tickets.updateMany(
          { ticketStatus: "close" },
          {
            $set: {
              ticketStatus: "open",
              bookingDate: null,
              passengerDetails: null,
            },
          }
        )
          .then((tickets) => {
            res.status(200).json({ message: "Update Successful" });
          })
          .catch((err) =>
            res.status(400).json({ errorMessage: "Error while updating" })
          );
      } else
        res
          .status(404)
          .json({ message: "Admin user not found with provided username" });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// @route POST api/users/
// @description Create User
// @access Public
router.post("/", (req, res) => {
  Users.findOne({ userName: req.body.userName })
    .then((user) => {
      if (user && Object.keys(user).length > 0) {
        res.send({ message: "User with username already created." });
      } else {
        Users.create(req.body)
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
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
