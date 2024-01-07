const responseJSON = require('./response');
const handleSuccess = (response, data) => responseJSON(response, 200, data);
const handleNotFound = (response, message) => responseJSON(response, 404, message);
const handleError = (response, error) => {
    console.error(error);
    responseJSON(response, 500, { message: error.message });
};

module.exports = {
    handleSuccess,
    handleNotFound,
    handleError
}