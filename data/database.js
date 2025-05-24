// Creates the connection to MongoDB
const {MongoClient} = require("mongodb");
require("dotenv").config();

let _db;

const connectToDb = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        _db = client.db();
        console.log(`Connected to MongoDB`);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
};

const getDb = () => {
    if (!_db) {
        throw Error("DB not initialized. Call to connectToDb first.");
    }
    return _db;
};

module.exports = {connectToDb, getDb};