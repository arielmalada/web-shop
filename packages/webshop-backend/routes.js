const router = require('./utils/router')
const { isAuth } = require('./utils/middleware')

const getAllUsersController = require('./controller/user/getAllUser.controller')
const getUserByIdController = require('./controller/user/getUserById.controller')
const registerController = require('./controller/user/register.controller')
const loginController = require('./controller/user/login.controller')
const modifyUserController = require('./controller/user/modifyUser.controller')


const handlePrivateRouteWithMiddleware = (middleware, next) => (request, response) => {
    middleware(request, response, next)
}



// indexing
router.get('/user', handlePrivateRouteWithMiddleware(isAuth, getAllUsersController))
router.get('/user/:id', getUserByIdController)
router.post('/register', registerController)
router.post('/login', loginController)
router.put('/user/:id', modifyUserController)