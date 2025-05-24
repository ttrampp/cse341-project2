// Talks directly to MongoDB database to get/save data
const {getDb, connectToDb} = require("../data/database");
const {ObjectId} = require('mongodb');

//GET all movies
const getAllMovies = async () => {
    const db = getDb();
    return await db.collection('movies').find().toArray();
}

//GET a movie by id
const getMovieById = async (id) => {
    const db = getDb();
    return await db.collection("movies").findOne({_id: new ObjectId(id)});
};

//ADD a new movie
const addMovie = async (movieData) => {
    const db = getDb();
    return await db.collection("movies").insertOne(movieData);
};

//UPDATE a movie
const updateMovie = async (id, movieData) => {
    const db = getDb();
    return await db.collection("movies").updateOne(
        {_id: new ObjectId(id)},
        {$set: movieData}
    );
};

//DELETE a movie
const deleteMovie = async (id) => {
    const db = getDb();
    return await db.collection("movies").deleteOne({_id: new ObjectId(id)});
};

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};