const UserModel = require('../../models/user.model');
const { handleSuccess, handleNotFound } = require('../../utils/handler');

/**
 * delete user controller
 */

const deleteUserByIdController = async (req, res) => {
    const id = req.params.id;

    const result = await UserModel.findByIdAndDelete(id);
    if (!result) {
        return handleNotFound(res, { message: 'User not found' });
    }
    return handleSuccess(res, result);




}

module.exports = deleteUserByIdController;
