export default class Model {
    constructor(payload = null) {
        this.payload = payload;
        this.result = null;
    }

    async save(db, obj) {
        db.push(obj);
        this.result = obj;
    }

    async updateDb(db, obj, id) {
        const i = id - 1;
        this.result = db.splice(i, 1, Object.assign(db[i], obj));
    }

    async deleteDb(db, id) {
        const i = id - 1;
        this.result = db.splice(i, 1);
    }
}
