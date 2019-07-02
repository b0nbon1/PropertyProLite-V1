import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';

const route = express.Router();

route.post('/register', Validation.user, Authentication.register);
route.post('/login', Validation.login, Authentication.loginUser);

export default route;
