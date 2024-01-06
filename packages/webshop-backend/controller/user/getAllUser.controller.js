const UserModel = require('../../models/user.model');
const responseJSON = require('../../utils/response');
const router = require('../../utils/router')
/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response Server's response
 * @returns {http.ServerResponse} response
 */
// use router and UserModel to get all users
const getAllUsers = async (request, response) => {
    try {
        const users = await UserModel.find({})
        responseJSON(response, 200, users)
    }
    catch (error) {
        console.error(error)
        responseJSON(response, 500, { message: error.message })
    }
}

router.get('/user', getAllUsers)
