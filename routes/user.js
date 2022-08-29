const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const{isRoleValid,emailExist}=require("../helpers/db-validators")
const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");



const router = Router();
router.get("/", userGet);
//para poner un middleware en una ruta se hace en el espacio del medio y si son varios se usa un arreglo
router.post(
  "/",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("password", "the length must be more than 6 characters").isLength({
      min: 6,
    }),
    check("email", "The email is not valid").isEmail(),
    check('email').custom(emailExist),
    //check('rol','Is not a valid role').isIn(["ADMIN_ROLE", "USER_ROLE"]),validarCampos]
    //cuando la funcion solo tiene un argumento no es necesario ponerlo pues pasa por default
    // check("rol").custom((rol)=>isRoleValid()),
    check("rol").custom(isRoleValid),
  ],
  userPost
);

router.put("/:id", userPut);

router.delete("/", userDelete);

module.exports = router;
