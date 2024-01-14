const { scryptSync } = require("crypto");

/**
 * getHash
 * @param {*} password 
 * @returns 
 */

const hash = (password) => scryptSync(password, process.env.SALT, 32).toString("hex");

const compare = (password, hashedPassword) => hash(password) === hashedPassword;

module.exports = {
    hash,
    compare
}