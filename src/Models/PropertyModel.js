import db from '../../database/Property';
import Model from './Model';
import clean from '../utils/helpers/checkEmpty';

export default class Property extends Model {
    async add() {
        const property = this.payload;
        await this.save(db, property);
    }

    async update() {
        // eslint-disable-next-line no-unused-vars
        const property = await clean(this.payload);
        const { id } = this.payload;
        this.updateDb(db, this.payload, id);
    }

    static async checkUser(id, owner) {
        const advert = db.find(o => o.id === parseInt(id, 10));
        return Object.is(advert.owner, owner);
    }
}
