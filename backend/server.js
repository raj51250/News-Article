const express = require("express");
const dbConnect = require("./db/dbConnect");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Load environment variables from .env file
require("dotenv").config();

const newsRoute = require("./routes/newsRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/newsitems/", newsRoute);
app.use("/api/users/", userRoute);

app.get("/", (req, res) => res.send("Hello RAJ"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Port is running on ${port}`));
