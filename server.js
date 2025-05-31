// My app's manager -- the brain of the operation; runs the app
require('dotenv').config();                             //I'm going to use secret stuff, like db passwords, and not want it in public files, so i use .env file
const express =  require('express');                    //Hey, bring in Express so I can build a web app
const cors = require('cors');                           //This lets us say it's okay for other websites to talk to my API
const {connectToDb} = require('./data/database');      //Hey, go grab the connectToDb function from our database.js file in the data folder

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRoute = require("./routes/authRoute");

// Required for login session tracking
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy

const app = express();                                  //Okay, now let's create the actual app using Express.
const port = process.env.PORT || 3000;                  //Listen for people visiting my site on the port in .env file

// Enable sessions for tracking users
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Serialize the user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Setup GitHub OAuth strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

// Middleware
app.use(cors());                                        //Gives persmission for all incoming requests so the browser doesn't block the connection
app.use(express.json());                                //Let me automatically turn any incoming JSON into JavaScript so it can be understood

// Middleware function to check if a user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({error: "You must be logged in to access this."});
}

// Routes
const movieRoutes = require('./routes/movies');         //Let's connect the routes/movies.js so I know what to do when someone goes to /movies. Bring in movie route.
app.use('/movies', movieRoutes);                        //When someone goes to /movies, use the routes defined in the movies.js file

const genresRoutes = require('./routes/genres');        //Le'ts connect the routes/genres.js so I know what to do when someone gose to /genres. Bring in genre route.
app.use('/genres', genresRoutes);                       //When someone goes to /genres, use the routes defined in the genres.js file

app.use("/auth", authRoute);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));    //creates my swagger ui page

// Redirects to GitHub for Login
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"]}));

// GitHub redirects here after login
app.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login-failure",
        successRedirect: "/login-success",
    })
);

// Login status check routes because it makes me feel better and people like to know if it worked
app.get("/login-success", (req, res) => {
    res.send(`Welcome ${req.user.username}, you are logged in with GitHub!`);
});

app.get("/login-failure", (req, res) => {
    res.send("Login failed. Please try again.");
});

app.get("/protected", ensureAuthenticated, (req, res) => {
    res.send("Only those who are logged-in can see this.");
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the CSE341 Movie API</h1>
        <p>Status: ${req.isAuthenticated() ? `Logged in as ${req.user.username}` : "Logged out"}</p>
        <ul>
            <li><a href="/auth/github">Login with GitHub</a></li>
            <li><a href="/auth/logout">Logout</a></li>
            <li><a href="/movies">View Movies (Protected)</a></li>
            <li><a href="/genres">View Genres</a></li>
            <li><a href="/api-docs">Swagger Documentation</a></li>
        </ul>
    `);
});

    

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