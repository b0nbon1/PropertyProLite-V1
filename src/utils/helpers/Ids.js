const Uid = (db) => {
    if (!db.length) {
        const obj = db.length + 1;
        return obj;
    }
    return db[db.length - 1].id + 1;
};

export default Uid;
