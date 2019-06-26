import bcrypt from 'bcrypt';
import userId from '../../database/Users';
import Uid from '../utils/helpers/Ids';
import User from '../Models/UsersModel';
import Res from '../utils/helpers/responses';

export default class Authentication {
    static async register(req, res) {
        try {
            const {
                firstname,
                lastname,
                email,
                address,
                phoneNumber,
                password,
            } = req.body;
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            const isAdmin = false;
            const id = Uid(userId);
            const newUser = new User({
                id,
                email,
                firstname,
                lastname,
                phoneNumber,
                password: hashedPassword,
                address,
                isAdmin,
            });
            if (!await newUser.register()) {
                return Res.handleError(409, 'email account exists', res);
            }
            // console.log(newUser.register());
            return Res.handleAuth(201, 'successfully created account', newUser.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
