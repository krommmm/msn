require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoute = require("./routes/auth_route");
const routeMessage = require("./routes/message_route");
const routeSound = require("./routes/sound_route");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:3000",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));

app.use("/welcome", (req, res, next) => {
    res.status(200).json({ msg: "Welcome !" });
});

app.use("/api/auth", authRoute);
app.use("/api/images/avatars",express.static(path.join(__dirname, "uploads/pictures/avatars")));
app.use("/api/messages", routeMessage);
app.use("/api/sound",routeSound);

module.exports = app;