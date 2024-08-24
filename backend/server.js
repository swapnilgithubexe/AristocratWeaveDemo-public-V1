const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database")

const cloudinary = require("cloudinary")

//Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

//Connecting to database
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(() => {
    process.exit(1);
  })
})