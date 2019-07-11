import db from '../database/Users';
import ad from '../database/Property';
import Model from './Model';
import filtData from '../utils/helpers/filterUser';

export default class User extends Model {
    async register() {
        const user = this.payload;
        const obj = await User.getUser(user.email);
        if (!obj) {
            this.save(db, user);
            return true;
        }
        return false;
    }

    async login() {
        const user = this.payload;
        const obj = await User.getUser(user);
        this.result = obj;
    }

    static async getUser(email) {
        const obj = db.find(o => o.email === email);
        return obj;
    }

    async profile() {
        const user = filtData(db.find(o => o.id === this.payload));
        const property = { properties: ad.filter(o => o.owner === this.payload) };
        const data = Object.assign(user, property);
        this.result = data;
    }
}
