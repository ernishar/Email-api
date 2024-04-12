const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sequelize = require('./src/utils/sequelize')
const routes = require('./src/routes/routes')
// Configuring dotenv
dotenv.config();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



// Cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/",routes);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello To Email API");
});

// Server
const PORT = process.env.PORT;

// Syncing the database
sequelize;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
