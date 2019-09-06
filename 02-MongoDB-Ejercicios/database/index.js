// Mongoose
const mongoose = require("mongoose");

// Conectar mongoose con MongoDB
var db_url = process.env.Mongodb_uri

mongoose.connect(db_url, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log("Conexion exitosa a MongoDB!!");
  } else {
    console.log('Something bad happen with database');
  }
});
