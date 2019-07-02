
import propertyId from '../../database/Property';
import date from '../utils/helpers/dates';
import Uid from '../utils/helpers/Ids';
import PropertyModel from '../Models/PropertyModel';
import Res from '../utils/helpers/responses';

const status = 'available';
const createdOn = date;

export default class Property {
    static async Post(req, res) {
        try {
            const {
                price, state, city, address, type, imageUrl,
            } = req.body;
            const id = Uid(propertyId);
            const user = await res.locals.user;
            const owner = user.id;
            const newProperty = new PropertyModel({
                id, status, owner, price, state, city, address, type, imageUrl, createdOn,
            });
            newProperty.add();
            return Res.handleSuccess(201, 'successfully created an advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async Update(req, res) {
        try {
            const {
                price, state, city, address, type, imageUrl,
            } = req.body;
            const id = parseInt(req.params.property_id, 10);
            const newProperty = new PropertyModel({
                id, status, price, state, city, address, type, imageUrl,
            });
            await newProperty.update();
            return Res.handleSuccess(200, 'successfully created an advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
