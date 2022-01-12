const express = require('express')
const cors = require("cors");
const {dbConnection} = require("../database/config.db");


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Connect to the DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of the application
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Read and parse of the body
        this.app.use( express.json() );

        // Directory public
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth.router'));
        this.app.use(this.usersPath, require('../routes/users.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;
