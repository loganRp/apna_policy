const jwt = require('jsonwebtoken')
const {config} = require('../../config/config')

exports.jwttoken =()=>{
    let token = jwt.sign({access : 'access-'},config.jwtKey,{expiresIn : 30})
    return token
}