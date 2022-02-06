const express = require("express");
const cors = require("cors");

const { authRoute, userRoute, postRoute } = require("./routes");
const errorHandler = require("./libs/middlewares/errorHandler");

/* ----------------------- express ---------------------- */
const app = express();
const port = process.env.PORT || 8000;

/* ----------------------- dotenv ----------------------- */
require("dotenv").config();

/* ---------------------- database ---------------------- */
require("./libs/configs/db")();

/* ------------------ for POST request ------------------ */
// the url have search params (?key=value) and query params (key=value)
// "extended: true" will handle request with rich objects and arrays encoded in the url
app.use(express.urlencoded({ extended: true }));
// request data send in JSON format
app.use(express.json());

/* ------------------------ cors ------------------------ */
// default with origin: *
// not include credentials
app.use(cors());

/* ----------------------- router ----------------------- */
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app at http://localhost:${port}`);
});
