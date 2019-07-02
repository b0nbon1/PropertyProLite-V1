import express from 'express';
import Property from '../controllers/PropertyController';
import Validation from '../utils/middleware/validators';
import Token from '../utils/helpers/jwt';

const route = express.Router();

route.post('/property', Validation.validateProperty, Token.userToken, Property.Post);

export default route;
