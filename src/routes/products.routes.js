// Importación del router de Express
import { Router } from "express";
// Importación del manager de productos
import productManager from "../managers/productManager.js";

// Creación del router
const router = Router();

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query; // Obtiene la query "limit"
    const products = await productManager.getProducts(limit); // Obtiene los productos utilizando el manager de productos

    res.status(200).json(products); // Responde con los productos obtenidos
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
    const product = await productManager.getProductById(+pid); // Obtiene el producto por su ID utilizando el manager de productos

    if (product) {
      return res.json({ status: 200, response: product }); // Responde con el producto encontrado si existe
    } else {
      const error = new Error(`Product with id: ${pid} is not found`); // Crea un nuevo error si el producto no se encuentra
      error.status = 404; // Establece el código de estado del error en 404
      throw error; // Lanza el error
    }
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body; // Obtiene el body de la request que contiene los datos del producto
    const newProduct = await productManager.addProduct(product); // Agrega el nuevo producto utilizando el gestor de productos

    res.status(201).json({
      message: "Product created successfully.",
      newProduct: product
    }); // Responde con el nuevo producto creado
    console.log("Product created successfully");
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(400).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para actualizar un producto existente
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
    const product = req.body; // Obtiene el body de la request que contiene los nuevos datos del producto
    const updateProduct = await productManager.updateProduct(+pid, product); // Actualiza el producto utilizando el manager de productos

    res.status(201).json({
      message: `The product with id number: ${pid} has been successfully updated.`,
      updatedProduct: updateProduct
  }); // Responde con el producto actualizado
    console.log("Product has been updated correctly");
  } catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.status(400).json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Ruta para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Obtiene el parámetro de la ruta "pid" (product id)
    const product = await productManager.getProductById(+pid);
    

  if (!product) {
      return res.status(404).json({
        status: 404,
        response: `Product with id: ${pid} is not found`,
      });
  };//Valida que el "pid" (product id) existe, sino retorna error

  await productManager.deleteProduct(+pid); // Elimina el producto utilizando el manager de productos

    res.status(201).json({
        message: `The product with id number: ${pid} has been successfully deleted.`,
      }); // Responde con un mensaje de éxito
    console.log("Product has been deleted correctly");
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