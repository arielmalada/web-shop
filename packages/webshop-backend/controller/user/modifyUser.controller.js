const UserModel = require('../../models/user.model');
const { handleUnauthorized, handleSuccess, handleError, handleNotFound } = require('../../utils/handler');

/**
 * modify user controller
 */

const modifyUserController = async (req, res) => {
    const {  email, name } = req.body;
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return handleNotFound(res);
        }
        const modifiedUserData = {
            email: email || user.email,
            name: name || user.name
        }

        Object.assign(user, modifiedUserData);

        await user.save();
        return handleSuccess(res, user);
    }
    catch (err) {
        return handleError(res, err);
    }
    
}

module.exports = modifyUserController;
