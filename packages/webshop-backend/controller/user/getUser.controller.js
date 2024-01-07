const UserModel = require('../../models/user.model');
const router = require('../../utils/router');
const { handleSuccess, handleNotFound, handleError } = require('../../utils/handler');
const responseJSON = require('../../utils/response');

// generate jsdoc
/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */

const getUser = async (request, response) => {
    const validateId = (id) => id.match(/^[0-9a-fA-F]{24}$/);
    try {
        if (!validateId(request.params.id)) {
            return responseJSON(response, 400, { message: 'Invalid id' });
        }

        UserModel.findById(request.params.id)
            .then((user) => {
                if (!user) {
                    handleNotFound(response, { message: 'User not found' });
                } else {
                    handleSuccess(response, user);
                }
            })
            .catch(handleError);
    } catch (error) {
        handleError(response, error);
    }
};

router.get('/user/:id', getUser)