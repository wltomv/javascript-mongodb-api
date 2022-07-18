const { verifyToken } = require('../helpers/jwtoken')

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if ([].concat(roles).includes("") && tokenData != null) {
            next()
        } else {
            res.status(403)
            res.send({ error: 'El rol de usuario no tiene los permisos necesarios' })
        }
    } catch (e) {
        res.status(403)
        res.send({ error: 'Sin autorizacion' })
    }

}

module.exports = checkRoleAuth