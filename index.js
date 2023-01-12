// Calling all the required packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

//middlewares
const auth = require("./middleware/auth");

//routes
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");

//configuration for dotenv file
dotenv.config();

//configuration for body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//configuration for ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

//connect db
mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() => console.log("DB Connected"))
     .catch((err) => console.log(err));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.use("/", uploadRoutes);
app.use("/user", userRoutes);

//server listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server connected on: " + port));
