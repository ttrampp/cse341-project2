// The to-do list that gets done when routes are visited. Actually does the work like fetching, saving, deleting
const movieModel = require("../models/moviesModel");

//GET all movies
const getAll = async (req, res) => {
    try {
        const movies = await movieModel.getAllMovies();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({error: "Failed to get movies. Sadness."});
    }
};

//GET one movie by ID
const getSingle = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await movieModel.getMovieById(id);
        if (!movie) {
            return res.status(404).json({error: "Movie not found. Don't start the popcorn just yet! 😟"});
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({error: "Failed to get movie. I guess someone didn't put the disc back in the case."});
    }
};

//ADD a movie
const createMovie = async (req, res) => {
    try{
        const movieData = req.body;

        //Simple validation
        if (!movieData.title || !movieData.director || !movieData.year) {
            return res.status(400).json({error: "Title, Director, and Year are required fields."});
        }

        const result = await movieModel.addMovie(movieData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({error: "Failed to add movie. Maybe you have overdue fees and can't rent one... Oh wait! Blockbuster isn't even a thing anymore. Hmmm, still no movie."});
    }
};

//UPDATE a movie
const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movieData = req.body;

        //Simple validation
        if (!movieData.title || !movieData.director || !movieData.year) {
            return res.status(400).json({error: "Title, Director, and Year are required fields."});
        }

        const result = await movieModel.updateMovie(id, movieData);
        if (result.modifiedCount === 0) {
            return res.status(404).json({error: "Sorry friend, either that movie couldn't be found OR it couldn't be changed."});
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({error: "Failed to update movie."});
    }
};

//DELETE a movie
const deleteMovie = async (req, res) =>{
    try {
        const id = req.params.id;
        const result = await movieModel.deleteMovie(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({error: "Movie not found."});
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({error: "I think my eraser is broke... The movie could not be deleted."});
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie,
};