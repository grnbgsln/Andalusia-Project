const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const bookingRouter = require('./routes/booking')
const galeriRouter = require('./routes/galeri')
const beritaRouter = require('./routes/beritaArtikel')
const PORT = process.env.PORT || 3000
const cors = require("cors");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/booking", bookingRouter)
app.use("/galeri", galeriRouter)
app.use("/berita", beritaRouter)

mongoose.set("strictQuery", false);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong";
  return res.status(errorStatus).json({
    succes: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("connect to backend");
});
