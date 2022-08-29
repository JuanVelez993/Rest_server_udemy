const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        //los atributos se puede declarar en el constructor
        this.app = express();
        this.port = process.env.PORT;
        //este sera el endpoint de la app
        this.usuariosPath = "/api/users";

        //conectar a la body
        this.conectarDB();
        //Middlewares
        this.middlewares();
        
        //Rutas de la aplicacion
        this.routes();

    }

    routes(){
      //aqui se define el endpoint para las rutas del router
       this.app.use(this.usuariosPath,require('../routes/user'));
    }
    middlewares(){
        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'))
    }

    listen(){
        this.app.listen(this.port);
    }

    async conectarDB(){
        await dbConnection();
    }

}
module.exports = Server;
