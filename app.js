const express = require("express");
const tickets = require('./routes/api/tickets')
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

app.use('/api/tickets', tickets);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

