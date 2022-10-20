const Role = require('../models/role')
const User = require('../models/users')


const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(`El rol ${role} no esta registrado en la BD`)
  }
}

const emailExists = async (email = '') =>{
const user = await User.findOne({email})
if(user){
    throw new Error(`Este correo ya esta registrado`)
  }
}


module.exports ={
    isValidRole,
    emailExists,
}
