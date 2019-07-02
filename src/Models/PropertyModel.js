import db from '../../database/Property';
import Model from './Model';

export default class Property extends Model {
    async addNew() {
        const property = this.payload;
        await this.save(db, property);
    }
}
