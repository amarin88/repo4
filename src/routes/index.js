// Importación del router de Express
import { Router } from "express";
// Importación de las rutas de productos
import productsRoutes from "./products.routes.js";
// Importación de las rutas de carritos
import cartsRoutes from "./carts.routes.js";

// Creación del router
const router = Router();

// Utiliza las rutas de productos bajo el prefijo "/products"
router.use("/products", productsRoutes);
// Utiliza las rutas de carritos bajo el prefijo "/carts"
router.use("/carts", cartsRoutes);

// Exporta el router
export default router;