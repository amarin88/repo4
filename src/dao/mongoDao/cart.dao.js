import { cartModel } from "../models/cart.model.js"; //Importamos el esquema de carritos
import { productModel } from "../models/product.model.js"; //Importamos el esquema de productos

/* const getAll = async () => {
    const carts = await cartModel.find();
    return carts;
  }; //Función asincrona para traer todos los carritos, retorna todos los carritos encontrados */
  
  const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
  }; //Función asincrona que recibe un id, busca el carrito que contenga ese id y lo retorna
  
  const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;  
  }; //Función asincrona que recibe la data que contendrá el carrito, y devuelve el carrito creado

  const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if(!product) return {
      product: false
    };
  
    await cartModel.findByIdAndUpdate(cid, { $push: {products: product} });
  
    const cart = await cartModel.findById(cid);
    if(!cart) return {
      cart: false
    };
  
    return cart;
    
  }; //Función asincrona que recibe el id del carrito y el id de un producto, busca el id del producto, sino lo encuentra arroja error, si lo encuentra busca el carrito por id para agregarlo, en caso de no encontrar el carrito también arroja error. Si la funcion se cumple devuelve el carrito con el producto agregado 
  
/*   const update = async (id, data) => {
      await cartModel.findByIdAndUpdate(id, data);
      const cart = await cartModel.findById(id);
      return cart;
  }; // Función asincrona que recibe el id del carrito y la data con la cual se actualizará el carrito, una vez actualizado busca el carirto por id y lo retorna
  
  const deleteOne = async (id) => {
      const cart = await cartModel.deleteOne({_id: id}); //EL id tiene que coincidir con el de la base de datos de mongo
      if(cart.deletedCount === 0) return false;
      return true;
  }; //Función asincrona que elimina el carrito por id */
  
  export default {
    //getAll,
    getById,
    create,
    addProductToCart,
    //update,
    //deleteOne
  }; //Exportamos todas las funciones