const mongoose = require("mongoose");

const dbConnection = async() =>{
    try{

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //Estas opciones ya no son necesarias
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log("Database online");

    }catch(e){
        throw new Error("Couldn't connect to the Database'");
    }

}

module.exports = {
  dbConnection,
};


