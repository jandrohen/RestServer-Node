const express = require('express')
const cors = require("cors");
const {dbConnection} = require("../database/config.db");


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
        }

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

        this.app.use(this.paths.auth, require('../routes/auth.router'));
        this.app.use(this.paths.categories, require('../routes/categories.router'));
        this.app.use(this.paths.users, require('../routes/users.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;
