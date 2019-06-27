import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';

const route = express.Router();

route.post('/register', Validation.validateUser, Authentication.register);
route.post('/login', Validation.validateLogin, Authentication.loginUser);

export default route;
