//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const articleSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  onExistence: { type: Number }
});

// Crear (convertir) el Schema to Model ---> mongoose.Model(modelName, schema)
const Article = mongoose.model('Article', articleSchema);

// Exportar
module.exports = Article;
