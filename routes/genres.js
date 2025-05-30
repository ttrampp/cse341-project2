const express = require("express");
const router = express.Router();

const genresController = require("../controllers/genresController");
const {ensureAuthenticated} = require('../middleware/authMiddleware');

router.get("/", genresController.getAll);
router.get("/:id", genresController.getSingle);
router.post("/", ensureAuthenticated, genresController.createGenre);
router.put("/:id", ensureAuthenticated, genresController.updateGenre);
router.delete("/:id", ensureAuthenticated, genresController.deleteGenre);

module.exports = router;