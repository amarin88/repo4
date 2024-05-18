// Importación del router de Express
import { Router } from "express";
// Importación del manager de productos
/* import productManager from "../fsManagers/productManager.js"; */
import productDao from "../dao/mongoDao/product.dao.js"; //Importamos el Dao de los productos

// Creación del router
const router = Router();

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    //const { limit } = req.query; // Obtiene la query "limit"
    //const products = await productManager.getProducts(limit); // Obtiene los productos utilizando el manager de productos
    const products = await productDao.getAll(); //Obtenemos los productos desde Dao

    res.status(200).json({ status: "success", payload: products }); // Responde con los productos obtenidos
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
    //const product = await productManager.getProductById(+pid); // Obtiene el producto por su ID utilizando el manager de productos
    const product = await productDao.getById(pid); //Obtiene el producto por su ID de la base de datos

    if (product) {
      return res.status(200).json({ status: "success", payload: product }); // Responde con el producto encontrado si existe
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
    //const newProduct = await productManager.addProduct(product); // Agrega el nuevo producto utilizando el gestor de productos
    const newProduct = await productDao.create(product); //Agrega el nuevo producto a la base de datos

    
    res.status(201).json({ status: "success", payload: product }); // Responde con el nuevo producto creado
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
    const productData = req.body; // Obtiene el body de la request que contiene los nuevos datos del producto
    //const updateProduct = await productManager.updateProduct(+pid, productData); // Actualiza el producto utilizando el manager de productos
    const updateProduct = await productDao.update(pid, productData); //Obtiene el id y actualiza el producto en la base de datos
    if (!updateProduct) {
      return res.status(404).json({
        status: "error",
        response: `Product with id: ${pid} is not found`,
      });
  };//Valida que el "pid" (product id) existe, sino retorna error

    res.status(200).json({ status: "success", payload: updateProduct }); // Responde con el producto actualizado
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
    //const product = await productManager.getProductById(+pid); //Obtiene el producto por id
    const product = await productDao.deleteOne(pid);// Obtiene el producto por id y lo elimina de la base de datos

  if (!product) {
      return res.status(404).json({
        status: "error",
        response: `Product with id: ${pid} is not found`,
      });
  };//Valida que el "pid" (product id) existe, sino retorna error

  //await productManager.deleteProduct(+pid); // Elimina el producto utilizando el manager de productos

    res.status(200).json({
      status: "success", 
      payload: `The product with id number: ${pid} has been successfully deleted.`,
      }); // Responde con un mensaje de éxito
  }catch (error) {
    console.log(error); // Registra cualquier error en la consola
    return res.json({
      status: error.status || 500, // Devuelve el código de estado del error o 500 si no está definido
      response: error.message || "ERROR", // Devuelve el mensaje de error o "ERROR" si no está definido
    });
  }
});

// Exporta el router
export default router;