const express = require('express')
const cors = require("cors");


class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares

        // Routes of the application
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directory public
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.get('/api', (req, res) => {
            res.json({
                message: 'get API'
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                message: 'put API'
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                message: 'post API'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                message: 'delete API'
            });
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port);
        });
    }
}

module.exports = Server;
