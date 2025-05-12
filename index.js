import express from "express"; // importar express
import dotenv from "dotenv"; //importar dotenv

dotenv.config(); //ejecuta dotenv

const app = express(); //crear una instancia de express

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port: http://localhost:" + PORT); //iniciar el servidor en el puerto 3001
});
