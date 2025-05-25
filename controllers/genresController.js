const genreModel = require("../models/genresModel");

//GET all genres
const getAll = async (req, res) =>{
    try {
        const genres = await genreModel.getAllGenres();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({error: "Failed to get genres."});
    }
};

//GET one genre by ID
const getSingle = async (req, res) =>{
    try {
        const id = req.params.id;
        const genre = await genreModel.getGenreById();
        if (!genre) {
            return res.status(404).json({error: "Genre not found. Sorry about that."});
        }
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({error: "Failed to get genre for you. I apologize."});
    }
};

//POST creat genre
const createGenre = async (req, res) =>{
    try {
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({error: "Name and description are required."});
        }

        const result = await genreModel.addGenre({name, description});
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({error: "Failed to create genre."});
    }
};

//PUT update genre
const updateGenre = async (req, res) =>{
    try {
        const id = req.params.id;
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({error: "Name and description are required."});
        }

        const result = await genreModel.updateGenre(id, {name, description});

        if (result.modifiedCount === 0) {
            return res.status(404).json({error: "Genre not found or not modified"});
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: "Failed to update genre."});
    }
};

//DELETE genre by ID
const deleteGenre = async (req, res) =>{
    try {
        const id = req.params.id;
        const result = await genreModel.deleteGenre(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({error: "Genre not found. So Sorry."});
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({error: "Failed to delete genre. I always second guess myself when deleting things."});
    }
};

module.exports = {
    getAll,
    getSingle,
    createGenre,
    updateGenre,
    deleteGenre,
};