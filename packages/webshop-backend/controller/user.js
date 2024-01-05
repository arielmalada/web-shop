const http = require('http');
const UserModel = require('../models/userModel');
const router = require('../utils/router')
/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response Server's response
 * @returns {http.ServerResponse} response
 */
// use router and UserModel to get all users
const getAllUsers = async (request, response) => {
    const users = await UserModel.find({});
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
}

router.get('/user', getAllUsers)
