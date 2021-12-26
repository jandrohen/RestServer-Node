const express = require('express')


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares

        // Routes of the application
        this.routes();
    }

    middlewares() {
        // Directory public
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.get('/api', (req, res) => {
            res.send('Hello World');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;
