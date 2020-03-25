const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// Routers
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const restricted = require('../auth/restricted-middleware');

const server = express();

// Configure Session
const sessionConfig ={
    name: "monkey",
    secret: "keep it safe",
    cookie: {
        maxAge: 1000 * 60 * 60, //Set age to 1 Hour
        secure: false,  //True in production to send over http
        httpOnly: true, //Restrict js acess
    },
    resave: false,
    saveUninitialized: true,
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.send('<h1>Users Database</h1>');
  });

  module.exports = server;



