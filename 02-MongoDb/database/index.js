// Mongoose
const mongoose = require("mongoose");

// Conectar mongoose con MongoDB
// db_uri='mongodb+srv://ericlucerogonzalez:<password>@cluster0-j4waz.mongodb.net/devFTest?retryWrites=true&w=majority';
// db_uri='mongodb+srv://ericlucerogonzalez:<password>@cluster0-j4waz.mongodb.net/ericlucerogonzalezmongoDB2019?retryWrites=true&w=majority'
db_uri='mongodb+srv://ericlucerogonzalez:<password>@cluster0-j4waz.mongodb.net/devFTest?retryWrites=true&w=majority'

mongoose.connect(db_uri, { useNewUrlParser: true }, err => {
  if (!err) {
    console.log("Conexion exitosa a MongoDB!!");
  } else {
    console.log('Something bad happen with database');
  }
});
