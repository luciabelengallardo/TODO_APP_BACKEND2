import express, { urlencoded } from "express"; // importar express
import dotenv from "dotenv"; //importar dotenv
import fs from "node:fs"; //importar fs
import cors from "cors"; //importar cors
import { url } from "node:inspector";

dotenv.config(); //ejecuta dotenv

const app = express(); //crear una instancia de express

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: "*", //permitir todas las solicitudes de origen cruzado desde cualquier origen
    credentials: true, //premitir el intercambio de credenciales (cookies, encabezados de autorizacion, etc.)
  })
);

app.use(express.json()); //analizar el cuerpo de la solicitud como JSON
app.use(
  urlencoded({
    extended: true, //analizar el cuerpo de la solicitud como URL codificada
  })
);

//MANEJO DE RUTAS
//leemos todos los archivos dentro del directorio `.src/routes` de forma sincrona.
//fs.readdirSync devuelve un array con los nombres de todos los archivos en ese directorio.
const routeFiles = fs.readdirSync("./src/routes");

//iteramos sobre cada archivo encontrado en el directorio de rutas

routeFiles.forEach((file) => {
  //usamos importaciones dinamicas (import()) para cargar cada modulo de ruta
  //esto es util porque:
  //1. nos permite cargar modulos de fomra asincrona
  //2. cada ruta se registra independientemente
  //3. si una ruta falla, no afecta a las demas.

  import(`./src/routes/${file}`)
    .then((route) => {
      //registramos la ruta en nuestra aplicacion Express
      //todas las rutas importadas seran prefijadas con `/api/v1`
      //esto nos da:
      // - versionado de API
      // - un punto de entrada  comun para todas las rutas
      // - mejor organizacion del codigo

      app.use(`/api/v1`, route.default);
    })
    .catch((err) => {
      console.error(`error al cargar la ruta ${file}:`, err);
    });
});

//iniciar el servidor

const server = async () => {
  try {
    app.listen(PORT, () => {
      console.log("server is running on port: http://localhost:" + PORT); //iniciar el servidor en el puerto 3002
    });
  } catch (error) {
    console.log("error al iniciar el servidor: ", error);
    process.exit(1); //salir del proceso con un codigo de error 1
  }
};

server(); //ejecutar la funcion server
