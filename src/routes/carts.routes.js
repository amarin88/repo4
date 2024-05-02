// Importación del router de Express
import { Router } from "express";
// Importación del manager de los carritos
import cartManager from "../managers/cartManager.js";
import productManager from "../managers/productManager.js";

// Creación del router
const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart(); // Crea un nuevo carrito utilizando el manager de carritos

        res.status(201).json({
            message: "New cart has been successfully created.",
            cart: cart
        }); // Responde con el carrito creado y el código de estado 201 (creado)
        console.log("New cart has been successfully created.");
    } catch (error) {
        console.log(error); // Registra cualquier error en la consola
        return res.status(400).json({
            status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
            response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
        });
    }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const { id, cid , pid } = req.params; // Obtiene los parámetros de la ruta "cid"(cart id) y "pid" (product id)
        const products = await productManager.getProductById( +pid );// Obtiene los productos existentes por "pid" (product id)
        const productToCart = await cartManager.addProductToCart( +cid, +pid ); // Agrega un producto al carrito utilizando el manager de carritos
        const cart = await cartManager.getCartsById( +cid ); // Obtiene el carrito por su ID utilizando el manager de carritos

        if (!cart) {
            return res.status(404).json({
                message: `Cart with ID ${cid} not found.`
            });
        }

        if(!products){
            return res.status(404).json({
                message: `Product with ID ${pid} doesn't found.`
        });
        };

        res.status(201).json({
            message: `The product with ID ${pid} has been successfully added.`,
            cart: productToCart
        }); // Responde con el carrito actualizado y el código de estado 201 (creado)
    } catch (error) {
        console.log(error); // Registra cualquier error en la consola
        return res.status(400).json({
            status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
            response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
        });
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params; // Obtiene el parámetro de la ruta "cid" (cart id)
        const cart = await cartManager.getCartsById( +cid ); // Obtiene el carrito por su ID utilizando el manager de carritos
    
        if (!cart) {
            return res.status(404).json({
                message: `Cart with ID ${cid} not found.`
            });
        }

        res.status(200).json({
            message: `Cart with ID ${cid} has been found successfully.`,
            cart: cart
        }); // Responde con los productos del carrito y el código de estado 200 (éxito)
    } catch (error) {
        console.log(error); // Registra cualquier error en la consola
        return res.status(404).json({
            status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
            response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
        });
    }
});

// Ruta para eliminar un carrito por su ID
router.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
      const cart = await cartManager.getCartsById(+cid);
      
  
    if (!cart) {
        return res.status(404).json({
          status: 404,
          response: `Cart with ID ${cid} is not found`,
        });
    };//Valida que el "cid" (cart id) existe, sino retorna error
  
    await cartManager.deleteCart(+cid); // Elimina el producto utilizando el manager de productos
  
      res.status(201).json({
          message: `The cart with ID ${cid} has been successfully deleted.`,
        }); // Responde con un mensaje de éxito
      console.log("Cart has been deleted correctly");
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return res.json({
        status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
        response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
      });
    }
  });

// Exporta el router
export default router;