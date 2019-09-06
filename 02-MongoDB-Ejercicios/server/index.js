// Servidor en express
const express = require("express");
const app = express();

// Check port
const port = process.env.port || 3000;

// ----------- BODY PARSER  ---------------
var bodyParser = require("body-parser");  // for parsing application/json
app.use(bodyParser.json());   // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Require Schema's
const Article = require("../models/ArticlesSchema");
const Ticket = require("../models/TicketSchema");

// -------------   CRUD  -----------------
app.get("/", (req, res) => {
  console.log("Hello World");
});

//  C: CREATE ------------
app.post("/api/v1/articulo", (req, res) => {
  // Recibir el articulo
  const articuloInfo = req.body;
  console.log("req.body");
  console.log(articuloInfo);

  // Guardar en db
  const newArticle = new Article(articuloInfo);
  newArticle.save((err, newArticle) => {
    return err
      ? res.status(400).send({ mensaje: "Hay un error", res: err })
      : res.status(200).send({ mensaje: "Article guardado", res: newArticle });
  });
});

app.post("/api/v1/ticket", (req, res) => {
  //Recibir el body de la peticion
  const aTicket = req.body;
  console.log(aTicket);

  const newTicket = new Ticket(aTicket);
  newTicket.save((err, newTicket) => {
    return err
      ? res.status(400).send({ mensaje: "Error en (ticket)", res: newTicket })
      : res.status(201).send({ mensaje: "Ticket creado", res: newTicket });
  });
});

//  R: READ ------------

// Get: Todos los articulos
app.get("/api/v1/articulos/", (req, res) => {
  // ----> metodo de Mongoose: find()
  Article.find()
    .then(articulos => res.status(200).send(articulos))
    .catch(articulos => res.status(400).send(articulos));
});
// Get: por id
app.get("/api/v1/articulos/:id", (req, res) => {
  // ----> metodo de Mongoose: findById()
  Article.findById(req.params.id)
    .then(articulos => res.status(200).send(articulos))
    .catch(articulos => res.status(400).send(articulos));
});

// Get: all Tickets
app.get("/api/v1/tickets/", (req, res) => {
  // ----> metodo de Mongoose: find()
  Ticket.find()
    .populate("articulos")
    .then(tickets => res.status(200).send(tickets))
    .catch(tickets => res.status(400).send(tickets));
});

// Get: a ticket by ID
app.get("/api/v1/tickets/:id/", (req, res) => {
  const ticketID = req.params.id;
  Ticket.findById(ticketID)
    .populate("articulos")
    .then(tickets => res.status(200).send(tickets))
    .catch(tickets => res.status(400).send(tickets));
});

//  U: UPDATE ------------

// Update de articulo
app.put("/api/v1/articulos/:id", (req, res) => {
  const articuloID = req.params.id;
  Article.findByIdAndUpdate(articuloID, { $set: req.body }, { new: true })
    .then(UpdateArticulo => res.status(200).send(UpdateArticulo))
    .catch(UpdateArticulo => res.status(400).send(UpdateArticulo));
});
// Update de ticket
app.put("/api/v1/tickets/:id", (req, res) => {
  const ticketID = req.params.id;

  Ticket.findByIdAndUpdate(ticketID, { $set: req.body }, { new: true })
    .then(UpdateTicket => res.status(204).send(UpdateTicket))
    .catch(UpdateTicket => res.status(400).send(UpdateTicket));
});

//  D: DELETE ------------
app.delete("/api/v1/articulos/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(DeleteArticulo => res.status(200).send(DeleteArticulo))
    .catch(DeleteArticulo => res.status(400).send(DeleteArticulo));
});
app.delete("/api/v1/tickets/:id", (req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(DeleteArticulo =>
      res.status(200).send({ mensaje: "Ticket eliminado", res: DeleteArticulo })
    )
    .catch(DeleteArticulo => res.status(404).send(DeleteArticulo));
});

// Get: Calcular subtotal, ITBM, total
app.get("/api/v1/tickets/factura/:id", (req, res) => {
  let subtotal = 0;
  let ITBM = 0;
  let total = 0;
  console.log(`Inside /api/v1/tickets/factura/${req.params.id}`);
  // Ticket ejemplo: 5d6f13aa5b35941635e42f4f
  Ticket.findById(req.params.id)
    .populate("articulos")
    .then(ticket => {
      ticket.articulos.map(articulo => {
        //Obtengo articulo.precio
        subtotal += articulo.price;
      });

      ITBM = subtotal * 0.07;
      total = subtotal + ITBM;
      console.log(`El subtotal: ${subtotal} \nEl total: ${total}`);

      // Update
      Ticket.findByIdAndUpdate(
        req.params.id,
        { subtotal: subtotal, ITBM: ITBM, total: total },
        { new: true }
      )
        .populate("articulos")
        .then(ticketCalculado => res.status(200).send(ticketCalculado))
        .catch(error => res.status(404).send(error));
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
// {
//     "subtotal": 0,
//     "ITBM": 0,
//     "total": 0,
//     "articles": ["Id-1","Id-2","Id-3"]
//   }

// Send variables when this file is 'required'
module.exports = { app, port };

// {
//   "name": "Eric Testing No. 0",
//   "price": 50,
//   "onExistence": true
// }

// {
//   "subtotal": "Eric Testing No. 0",
//   "ITBM": 7,
//   "total": 100,
//   "articles":,
// }
