const {response}=require('express');


const userGet = (req, res) => {
  /**es posible añadir parametros opcionales a las consultas de la siguiente forma
   * const { nombre, limite,apikey} = req.query;
   * estos se delimitan en las queries por ir despues de un ?
   */
  res.json({
    msg: "Get API-Controller",
  });
};

const userPost=(req, res) => {
  // aqui se puede desestructurar lo que llega del body y solo usar lo que necesito
  const body = req.body;
  //con destructuracuon  const {name, email, password, role} = req.body;
  res.json({
    msg: "Post API",
    body,
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