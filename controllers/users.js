const {response}=require('express');
const bcryptjs = require("bcryptjs");


const User = require("../models/usuario"); // La mayuscula permite creas instancias


const userGet = (req, res) => {
  /**es posible añadir parametros opcionales a las consultas de la siguiente forma
   * const { nombre, limite,apikey} = req.query;
   * estos se delimitan en las queries por ir despues de un ?
   */
  res.json({
    msg: "Get API-Controller",
  });
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

const userPut = (req, res) => {
  //este parametro esta definido en la ruta del put
  const id = req.params.id;
  //forma alterna const {id} = req.params;
  res.json({
    msg: "PUT API",
    id,
  });
};

const userDelete=(req, res) => {
  res.json({
    msg: "DELETE API",
  });
}

module.exports = { userGet, userPost, userPut, userDelete };