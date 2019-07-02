import db from '../../database/Users';
import Model from './Model';

export default class User extends Model {
    async register() {
        const user = this.payload;
        const obj = await User.getUser(user.email);
        if (!obj) {
            await this.save(db, user);
            return true;
        }
        return false;
    }

    async login() {
        const user = this.payload;
        const obj = await User.getUser(user);
        if (!obj) {
            return false;
        }
        this.result = obj;
        return true;
    }

    static async getUser(email) {
        const obj = db.find(o => o.email === email);
        return obj;
    }
}
