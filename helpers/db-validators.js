const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error(`El rol ${ role } no existe en la BD`)
    }
}

const existEmail = async (email = '') => {
    // Check if the email exists
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

module.exports = {
    isRoleValid,
    existEmail
}
