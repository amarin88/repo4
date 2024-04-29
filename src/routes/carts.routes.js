// Importación del router de Express
import { Router } from "express";
// Importación del manager de los carritos
import cartManager from "../managers/cartManager.js";

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
        return res.json({
            status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
            response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
        });
    }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const { cid , pid } = req.params; // Obtiene los parámetros de la ruta "cid"(cart id) y "pid" (product id)
        const cart = await cartManager.addProductToCart( +cid, +pid ); // Agrega un producto al carrito utilizando el manager de carritos

        res.status(201).json({
            message: `The product with ID ${pid} has been successfully added.`,
            cart: cart
        }); // Responde con el carrito actualizado y el código de estado 201 (creado)
    } catch (error) {
        console.log(error); // Registra cualquier error en la consola
        return res.json({
            status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
            response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
        });
    }
});

// Ruta para obtener los productos de un carrito por su ID
router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params; // Obtiene el parámetro de la ruta "cid" (cart id)
        const cart = await cartManager.getCartsById( +cid ); // Obtiene los productos del carrito por su ID utilizando el manager de carritos

        res.status(200).json({
            message: "Cart retrieved successfully.",
            cart: cart
        }); // Responde con los productos del carrito y el código de estado 200 (éxito)
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

