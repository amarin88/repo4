// Imports de los módulos necesarios
import express from "express";
import router from "./routes/index.js"; // Importa el router principal

// Instancia de express
const app = express();

// Configuración del puerto
const PORT = 8080;
const ready = () =>
  console.log(
    `Server ready on http://localhost:${PORT}. Press Ctrl + C to stop.`
  );

app.use(express.json()); // Middleware para analizar las solicitudes con formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar las solicitudes con datos codificados en URL

app.use("/api", router); // Utiliza el router principal bajo el prefijo "/api"

app.listen(PORT, ready); // Inicia el servidor en el puerto especificado y muestra un mensaje de confirmación cuando está listo
