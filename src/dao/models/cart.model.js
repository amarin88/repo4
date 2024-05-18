import mongoose from "mongoose"; //Importamos mongoose

const cartCollection = "carts"; //Nombre de la colección

const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  }
}); //Esquema del carrito

export const cartModel = mongoose.model(cartCollection, cartSchema);