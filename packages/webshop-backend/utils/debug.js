// playground file for testing/debugging

const { randomBytes } = require("crypto")

const secret = randomBytes(16).toString("hex")

console.log(secret)