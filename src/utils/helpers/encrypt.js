import bcrypt from 'bcrypt';

export default class Encrypt {
    static async hash(password) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return hashedPassword;
    }

    static async check(password, hashed) {
        const result = bcrypt.compareSync(password, hashed);
        return result;
    }
}
