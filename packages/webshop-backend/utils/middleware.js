const jwt = require('jsonwebtoken')
const responseJSON = require('./response')

/**
 * isAuth middleware
 * @description check if user is authenticated
 * @params next function which execute after success verify token
 * @params request headers
 * @params response headers
 * @returns next function / error message
 */

const isAuth = (request, response, next) => {
    const authHeader = request.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return responseJSON(response, 403, { message: 'Invalid token' })
            }
            // console.log(user)
            return next(request, response)
        })
    } else {
        return responseJSON(response, 401, { message: 'Unauthorized' })
    }
}

module.exports = {
    isAuth
}