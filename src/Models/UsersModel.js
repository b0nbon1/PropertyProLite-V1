import db from '../../database/Users';
import Model from './Model';

export default class User extends Model {
    async register() {
        const user = this.payload;
        const obj = db.find(o => o.email === user.email);
        if (!obj) {
            await this.save(db, user);
            return true;
        }
        return false;
    }
}
