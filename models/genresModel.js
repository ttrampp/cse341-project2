const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllGenres = async () => {
    return await mongodb.getDb().db().collection("genres").find().toArray();
};

const getGenreById = async (id) => {
    return await mongodb.getDb().db().collection("genres").findOne({_id: new ObjectId(id)});
};

const addGenre = async (genreData) => {
    return await mongodb.getDb().db().collection("genres").insertOne(genreData);
};

const updateGenre = async (id, genreData) => {
    return await mongodb.getDb().db().collection("genres").updateOne(
        {_id: new ObjectId(id)},
        {$set: genreData}
    );
};

const deleteGenre = async (id) => {
    return await mongodb.getDb().db().collection("genres").deleteOne({_id: new ObjectId(id)});
};

module.exports = {
    getAllGenres,
    getGenreById,
    addGenre,
    updateGenre,
    deleteGenre,
};