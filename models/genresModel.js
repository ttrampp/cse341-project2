// Talks directly to MongoDB database to get/save data
const {getDb, connectToDb} = require("../data/database");
const {ObjectId} = require('mongodb');

//GET all genres
const getAllGenres = async () => {
    const db = getDb();
    return await db().collection("genres").find().toArray();
};

//GET a genre by id
const getGenreById = async (id) => {
    const db = getDb();
    return await db().collection("genres").findOne({_id: new ObjectId(id)});
};


//Add a new genre
const addGenre = async (genreData) => {
    const db = getDb();
    return await db().collection("genres").insertOne(genreData);
};

//UPDATE a genre
const updateGenre = async (id, genreData) => {
    const db = getDb();
    return await db().collection("genres").updateOne(
        {_id: new ObjectId(id)},
        {$set: genreData}
    );
};

//DELETE a genre
const deleteGenre = async (id) => {
    const db = getDb();
    return await db().collection("genres").deleteOne({_id: new ObjectId(id)});
};

module.exports = {
    getAllGenres,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre,
};