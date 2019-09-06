const { app, port } = require("./server/index");

//Require the dotenv
var dotenv = require('dotenv');
dotenv.config();

// Require database
require('./database');


// Start the server
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto: ${port}`);
});