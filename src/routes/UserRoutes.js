import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';
import Auth from '../utils/middleware/Auth';

const route = express.Router();

route.post('/auth/signup', Validation.user, Authentication.register);
route.post('/auth/login', Validation.login, Authentication.loginUser);
route.get('/auth/user', Auth.userToken, Authentication.profile);

export default route;
