//packages
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const config = require("config");
const MongoStore = require("connect-mongo")(session);
const socket = require("socket.io");
const helmet = require("helmet");
const path = require('path')
const flash = require('connect-flash');

//routers
const recipients = require("./routes/api/recipients");
const sponsors = require("./routes/api/sponsors");
const recipientProfile = require("./routes/api/recipientProfile");
const sponsorProfile = require("./routes/api/sponsorProfile");
const hackathons = require("./routes/api/hackathons");
const hackathonProfile = require("./routes/api/hackathonProfile");
const auth = require("./routes/api/auth");
const chat = require("./routes/api/chats");
const posts = require("./routes/api/posts");

//database functions
const connectDB = require("./config/db");

//models
const Recipient = require("./models/Recipient");
const Sponsor = require("./models/Sponsor");

//passport authentication strategies
const { local } = require("./config/passport");

const PORT = process.env.PORT || 6969;


function initServer() {
    const app = express();

    //initialize database
    connectDB();

    // helmet middleware
    app.use(helmet.xssFilter());

    //express json format body parsing middleware
    app.use(express.json({ extended: false }));

    //initializing store for sessions
    // const store = new MongoStore({
    //     uri: config.get('mongoURI'),
    //     database: "SessionStorage",
    //     collection: 'mySessions'
    // }, (err) => {
    //     console.log("Database session connection error")
    //     console.error(error);
    //     process.exit(1);
    // });

    // Catch errors
    // store.on('error', function(error) {
    //     console.log("database session storage error")
    //     console.log(error);
    // });

    //initializing session
    console.log("initializing session");
    app.use(
        session({
            secret: config.get("sessionSecret"),
            cookie: { maxAge: 10800000 },
            store: new MongoStore({ url: config.get("mongoURI") }),
            resave: true,
            saveUninitialized: true,
        })
    );


    //initializing passport, passport strategies, and passport session
    console.log("initializing passport");
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    local(passport);

    //serializes user and attaches cookies
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // deserializes user and attaches user object to req.user from session
    passport.deserializeUser(async(id, done) => {
        try {
            console.log("hello");
            console.log(`id : ${id}`);
            const recipient = await Recipient.findById(id);
            const sponsor = await Sponsor.findById(id);
            const user = recipient || sponsor;
            done(null, user);
        } catch (err) {
            console.log("deserialization error");
            return done(err);
        }
    });

    //production static serving from client side
    if (process.env.NODE_ENV === "production") {
        console.log("SERVING STATIC FROM CLIENT/BUILD")
        app.use(express.static("client/build"));
        console.log(path.resolve(__dirname, "client", "build", "index.html"))
        app.get("/*", (req, res) => {
            console.log('sending file')
            try {
                res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
            } catch (err) {
                res.status(500).send('Server Error With Backup React Routing Fix')
            }
        });
    }


    //Use the routes
    app.use("/api/users", recipients);
    app.use("/api/sponsors", sponsors);
    app.use("/api/profiles/recipient", recipientProfile);
    app.use("/api/profiles/sponsor", sponsorProfile);
    app.use("/api/hackathons", hackathons);
    app.use("/api/hackathons/hackathon", hackathonProfile);
    app.use("/api/auth", auth);
    app.use("/api/chat", chat);
    app.use("/api/posts", posts);

    //Server Initialization
    let server = app.listen(PORT, () => {
        console.log(`Server Initialized on port ${PORT}`);
    });

    let io = socket(server);

    // io.on('connection', (socket) => {
    //     console.log("Connection to socket made...")

    //     socket.on('newMessage', (message) => {
    //         io.sockets.emit('newMessage', (message))
    //     })
    // });
    console.log('passes?')
    return server;
}
const res = initServer();

function closeServer(res) {
    res.close()
}

module.exports = { initServer, closeServer }