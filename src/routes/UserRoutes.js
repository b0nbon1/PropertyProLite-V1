import express from 'express';
import Authentication from '../controllers/AuthController';
import Validation from '../utils/middleware/validators';

const route = express.Router();

route.post('/register', Validation.validateRegisterUser, Authentication.register);

export default route;
