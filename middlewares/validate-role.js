const {response, request} = require('express')

const isRole = (...roles) =>{
    return (req=request, res=response, next) =>{
        if(!req.authenticateUser){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin primero validar el token'
            })
        }
        if(!roles.includes(req.authenticateUser.role)){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles: ${roles}`
            })
        }
        next()
    }
}

module.exports = {isRole}
