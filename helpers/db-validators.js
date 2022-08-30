const Role = require("../models/role");
const User = require("../models/usuario");

const isRoleValid = async (role = "") => {
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

const userExistsById = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`The user with the id ${id} doesn't exists`);
  }
};

module.exports = { isRoleValid, emailExist, userExistsById };
