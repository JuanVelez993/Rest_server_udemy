const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "The email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "The role is mandatory"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
/**los metodos del modelo pueden ser modificados de la siguiente forma
 * en este caso por ejemplo modificamos el metodo toJson para excluir
 * la contraseña
 * una funcion de flecha mantiene el this fuera de la misma,en la normal solo a lo de dentro
 */
UserSchema.methods.toJSON=function(){
  const {__V,password,...user}=this.toObject();
  return user;

}

//el primer item es el nombre de la coleccion en mongo
module.exports = model("User", UserSchema);
