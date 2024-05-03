const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route.js");
const recipesRoutes = require("./routes/recipes.route.js");
const reviewRoutes = require("./routes/review.route.js");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/recipes", recipesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

const start = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    })
    .catch((err) => console.log(err));
};

start();
