import express from "express"; //importo express

const router = express.Router(); //creo una instancia de express.Router()

router.get("/", (req, res) => {
  res.send("esta es la ruta para los usuarios");
});
router.get("/about", (req, res) => {
  res.send("esta es la ruta de about");
});

export default router; //exporto la instancia express.Router()
