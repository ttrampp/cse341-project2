// Tells my app what to do when someone visits /movies. Listens for specific requests and tells the controller what to do about it.
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviesController");

//GET all movies
router.get("/", movieController.getAll);

//GET one movie by ID
router.get("/:id", movieController.getSingle);

//POST a new movie
router.post("/", movieController.createMovie);

//PUT update a movie by ID
router.put("/:id", movieController.updateMovie);

//DELETE a movie by ID
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
