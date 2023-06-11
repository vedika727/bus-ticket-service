const mongoose = require("mongoose");
const config = require("config");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = config.get("mongoURI");
const client = new MongoClient(uri);
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
connectDB().catch(console.dir);

module.exports = connectDB;
