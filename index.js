import express from "express"; // importar express

const app = express(); //crear una instancia de express

app.get("/", (req, res) => {
  res.send("mi primer servidor con express"); //envia una respuesta al cliente
});

app.get("/about", (req, res) => {
  res.send("esta es la ruta para la pagina about");
});

const PORT = 3001; //definir el puerto

app.listen(PORT, () => {
  console.log("server is running on port: http://localhost:" + PORT); //iniciar el servidor en el puerto 3001
});
