const mongoose = require("mongoose");

//connectDatabase function to connect with the database
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDB has been connected successfully at: ${data.connection.host}`)
  })
}


module.exports = connectDatabase;

