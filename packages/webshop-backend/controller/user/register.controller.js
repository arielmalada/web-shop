// Import necessary modules or dependencies
const UserModel = require("../../models/user.model");
const responseJSON = require('../../utils/response');
const { hash } = require('../../utils/hash');

// Define the register controller function
const registerController = (req, res) => {
    // parse request body
    const { name, email, password } = req.body;
    // check if name, email, password is not empty
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'name, email, password is required' });
    }
    // register to db
    // check if user exists
    UserModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                return responseJSON(res, 400, { message: 'user already exists' });
            }
            // if not exists create user
            const newUser = new UserModel({
                name,
                email,
                password: hash(password)
            });
            // save user to db
            newUser.save()
                .then(() => {
                    return responseJSON(res, 201, { message: 'register success' });
                })
                .catch((error) => {
                    console.error(error);
                    return responseJSON(res, 500, { message: error.message });
                });
        })
        .catch((error) => {
            console.error(error);
            return responseJSON(res, 500, { message: error.message });
        });
};

module.exports = registerController;