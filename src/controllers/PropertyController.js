
import propertyId from '../../database/Property';
import reportId from '../../database/report';
import date from '../utils/helpers/dates';
import Uid from '../utils/helpers/Ids';
import PropertyModel from '../Models/PropertyModel';
import Res from '../utils/helpers/responses';
import upload from '../utils/helpers/upload';

const status = 'available';

export default class Property {
    static async Post(req, res) {
        try {
            const {
                price, state, city, address, type,
            } = req.body;
            const image = req.files.photo;
            const id = Uid(propertyId);
            const imageUrl = await upload(image, id);
            const owner = res.locals.user;
            const createdOn = date();
            if (!imageUrl) return Res.handleError(400, 'Please try again to upload your image', res);
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
                id, price, state, city, address, type, imageUrl,
            });
            await newProperty.update();
            return Res.handleSuccess(200, 'successfully updated advert', newProperty.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await PropertyModel.findAll();
            return Res.handleSuccess(200, 'got all properties successfully', data, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async getOne(req, res) {
        try {
            const id = parseInt(req.params.property_id, 10);
            const property = new PropertyModel(id);
            if (await property.findOne()) return Res.handleSuccess(200, 'got property successfully', property.result, res);
            return Res.handleError(404, 'Property with such id does not exists', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async markSold(req, res) {
        try {
            const id = parseInt(req.params.property_id, 10);
            const owner = res.locals.user;
            if (!await PropertyModel.checkUser(id, owner)) return Res.handleError(406, 'None of the ads with such id belongs to you', res);
            const sold = { status: 'sold', id };
            const property = new PropertyModel(sold);
            await property.update();
            return Res.handleSuccess(200, 'sold property successfully', property.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async delProperty(req, res) {
        try {
            const id = parseInt(req.params.property_id, 10);
            const owner = res.locals.user;
            if (!await PropertyModel.checkUser(id, owner)) return Res.handleError(406, 'None of the ads with such id belongs to you', res);
            const property = new PropertyModel(id);
            await property.del();
            // nextline handleError works as handleSuccess
            return Res.handleError(200, 'delete property successfully', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async specType(req, res) {
        try {
            const { type } = req.query;
            const property = new PropertyModel(type);
            if (!await property.getType()) return Res.handleError(404, 'adverts with this type does not exists', res);
            return Res.handleSuccess(200, 'got specific type Successful', property.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async report(req, res) {
        try {
            const {
                reason, description,
            } = req.body;
            const id = Uid(reportId);
            // eslint-disable-next-line no-shadow
            const propertyId = parseInt(req.params.property_id, 10);
            const createdOn = date();
            const property = new PropertyModel({
                reason, description, id, createdOn, propertyId,
            });
            if (!await property.report()) return Res.handleError(404, 'Property with such id does not exists', res);
            return Res.handleSuccess(201, 'successfully created a report', property.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
