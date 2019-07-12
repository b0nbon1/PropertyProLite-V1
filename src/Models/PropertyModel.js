import db from '../database/Property';
import dbReport from '../database/report';
import Model from './Model';
import clean from '../utils/helpers/checkEmpty';

export default class Property extends Model {
    async add() {
        const property = this.payload;
        this.save(db, property);
    }

    async update() {
        // eslint-disable-next-line no-unused-vars
        const property = await clean(this.payload);
        const { id } = this.payload;
        this.updateDb(db, this.payload, id);
    }

    static async checkUser(id, owner) {
        const advert = db.find(o => o.id === parseInt(id, 10));
        if (advert) return Object.is(advert.owner, owner);
        return false;
    }

    static async findAll() {
        const advert = db.filter(ob => ob.status === 'available');
        return advert;
    }

    async findOne() {
        const advert = db.find(o => o.id === this.payload);
        if (advert) {
            this.result = advert;
            return true;
        }
        return false;
    }

    async del() {
        this.deleteDb(db, this.payload);
    }

    async getType() {
        const advert = db.filter(o => o.type === this.payload);
        this.result = advert;
    }

    static checkType(obj, type) {
        const advert = db.filter(ob => ob[type] === obj);
        if (!advert.length) {
            return false;
        }
        return true;
    }

    static async exists(id) {
        const advert = db.find(o => o.id === id);
        if (!advert) return false;
        return true;
    }

    async report() {
        const advert = db.find(o => o.id === this.payload.propertyId);
        if (!advert) return false;
        const report = this.payload;
        await this.save(dbReport, report);
        return true;
    }
}
