const Role = require("../models/role");
const User = require("../models/usuario");

const isRoleValid = async (rol = "") => {
  const rolExist = await Role.findOne({ role });
  if (!rolExist) {
    throw new Error(`The role ${role} does not exist in the database`);
  }
};

const emailExist = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`"The ${email} email is already registred `);
  }
};

module.exports = { isRoleValid, emailExist };
