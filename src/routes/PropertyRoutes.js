import express from 'express';
import Property from '../controllers/PropertyController';
import Validations from '../utils/middleware/validators';
import Token from '../utils/middleware/Auth';

const route = express.Router();

route.post('/property', Validations.property, Token.userToken, Property.Post);
route.patch('/property/:property_id', Token.userToken,
    Validations.update, Property.Update);
route.get('/property', Property.getAll);
route.get('/property/:property_id', Property.getOne);
route.patch('/property/:property_id/sold', Token.userToken, Property.markSold);

export default route;
