const {generateToken} = require('../../utils/jwt');
const { compare } = require('../../utils/hash');
const UserModel = require('../../models/user.model');
const { handleUnauthorized, handleSuccess, handleError } = require('../../utils/handler');

/**
 * login controller
 */

const loginController = async (req, res) => {
    const { email, password } = req.body;
    // if (!email || !password) return res.status(400).json({ message: 'email and password is required' });

    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) return handleUnauthorized(res, { message: 'email / password is invalid' });
        const isMatch = compare(password, user.password);
        if (!isMatch) return handleUnauthorized(res, { message: 'email / password is invalid' });
        const token = generateToken(user);

        return handleSuccess(res, { token });
    } catch (error) {
        console.error(error);
        return handleError(res, error)
    }
}

module.exports = loginController;
