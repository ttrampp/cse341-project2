const express = require("express");
const router = express.Router();

const genresController = require("../controllers/genresController");

router.get("/", genresController.getAll);
router.get("/:id", genresController.getSingle);
router.post("/", genresController.createGenre);
router.put("/:id", genresController.updateGenre);
router.delete("/:id", genresController.deleteGenre);

module.exports = router;