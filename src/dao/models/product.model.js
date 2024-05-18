import mongoose from "mongoose"; //Importamos mongoose

const productCollection = "products"; // Nombre de la colección

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Array,
    default: [],
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    require: true,
  },
}); // Esquema completo del producto, con todos los campos requeridos

export const productModel = mongoose.model(productCollection, productSchema);