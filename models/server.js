const express = require("express");
var cors = require("cors");

class Server {
    constructor() {
        //los atributos se puede declarar en el constructor
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/users";
        
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
}
module.exports = Server;
