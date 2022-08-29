const { validationResult } = require("express-validator");

/**next es un argumento de middlewares e indica la accion 
 * que se debe llevar a acabo si este se ejecuta correctamente
*/
const validarCampos = (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = { validarCampos };
