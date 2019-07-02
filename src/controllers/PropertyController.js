
import propertyId from '../../database/Property';
import date from '../utils/helpers/dates';
import Uid from '../utils/helpers/Ids';
import PropertyModel from '../Models/PropertyModel';
import Res from '../utils/helpers/responses';

const id = Uid(propertyId);
const status = 'available';
const createdOn = date;

export default class Property {
    static async Post(req, res) {
        try {
            const {
                price, state, city, address, type, imageUrl,
            } = req.body;
            const owner = res.locals.user.id;
            const newProperty = new PropertyModel({
                id, status, owner, price, state, city, address, type, imageUrl, createdOn,
            });
            newProperty.addNew();
            return Res.handleSuccess(201, 'successfully created an advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
