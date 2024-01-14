const UserModel = require('../../models/user.model');
const responseJSON = require('../../utils/response');
/**
 * 
 * @param {*} request // not used
 * @param {*} response //
 * @returns 
 */

// use router and UserModel to get all users
const getAllUsersController= async (request, response) => {
    try {
        const users = await UserModel.find({})
        responseJSON(response, 200, users)
    }
    catch (error) {
        console.error(error)
        responseJSON(response, 500, { message: error.message })
    }
}

module.exports = getAllUsersController;