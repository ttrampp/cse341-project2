// My app's manager -- the brain of the operation; runs the app
require('dotenv').config();                             //I'm going to use secret stuff, like db passwords, and not want it in public files, so i use .env file
const express =  require('express');                    //Hey, bring in Express so I can build a web app
const cors = require('cors');                           //This lets us say it's okay for other websites to talk to my API
const {connectToDb} = require('./data/database');      //Hey, go grab the connectToDb function from our database.js file in the data folder

const app = express();                                  //Okay, now let's create the actual app using Express.
const port = process.env.PORT || 3000;                  //Listen for people visiting my site on the port in .env file

// Middleware
app.use(cors());                                        //Gives persmission for all incoming requests so the browser doesn't block the connection
app.use(express.json());                                //Let me automatically turn any incoming JSON into JavaScript so it can be understood

// Routes
const movieRoutes = require('./routes/movies');         //Let's connect the routes/movies.js so I know what to do when someone goes to /movies. Bring in movie route.
app.use('/movies', movieRoutes);                        //When someone goes to /movies, use the routes defined in the movies.js file

const genresRoutes = require('./routes/genres');        //Le'ts connect the routes/genres.js so I know what to do when someone gose to /genres. Bring in genre route.
app.use('/genres', genresRoutes);                       //When someone goes to /genres, use the routes defined in the genres.js file

// Connect to DB and start server
connectToDb()                                           //Hey database, are you there and ready?
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost"${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });