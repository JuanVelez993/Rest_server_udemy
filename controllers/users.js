const {response}=require('express');
const bcryptjs = require("bcryptjs");


const User = require("../models/usuario"); // La mayuscula permite creas instancias
const usuario = require('../models/usuario');


const userGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = {state: true}
  /*es posible añadir parametros opcionales a las consultas de la siguiente forma
   const { nombre, limite,apikey} = req.query;
    estos se delimitan en las queries por ir despues de un ?
   */
  /*const usuarios=await usuario.Find(query)
  .skip(Number(from))
  .limit(Number(limit));*/
  //promise all ejecuta las promesas de manera simultanea y se pueden destructurar en arreglos
  const [total, users] = await Promise.all([ 
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
};

const userPost= async(req, res) => {

/* aqui se puede desestructurar lo que llega del body y solo usar lo que necesito
  const body = req.body;*/
  //con destructuracuon  const {name, email, password, role} = req.body;
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //verify email exist
  /*const existEmail=await User.findOne({email})
  if(existEmail) {
    return res.status(400).json({ msg: "That email is already registred "});
  }*/

  //encript password
  //el salt es el proceso de encriptacion su valor default es 10 a mayor valor mas seguridad
  const salt=bcryptjs.genSaltSync();
  user.password=bcryptjs.hashSync(password,salt);

  //save in db
  await user.save();
  res.json({
    msg: "Post API",
    user,
  });
}

const userPut = async(req, res) => {
  //este parametro esta definido en la ruta del put const id = req.params.id;
  const {id }= req.params;
  const { _id, password, google, email, ...rest } = req.body;
  

   if (password) {
     
     const salt = bcryptjs.genSaltSync(); 
     rest.password = bcryptjs.hashSync(password, salt);
   }
   const user = await User.findByIdAndUpdate(id, rest);

   
  res.json({
    msg: "PUT API",
    user,
  });
};

const userDelete=async (req, res) => {
   const { id } = req.params;

   //para borrarlo de la bd
   //const user = await User.findByIdAndDelete(id);
   const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    msg: "DELETE API",
  });
}

module.exports = { userGet, userPost, userPut, userDelete };