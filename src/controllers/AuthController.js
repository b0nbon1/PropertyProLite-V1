import bcrypt from 'bcrypt';
import userId from '../../database/Users';
import Uid from '../utils/helpers/Ids';
import User from '../Models/UsersModel';
import Res from '../utils/helpers/responses';

const isAdmin = false;
const id = Uid(userId);

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
            if (!await newUser.register()) return Res.handleError(409, 'email account exists', res);
            return Res.handleSuccess(201, 'successfully created account', newUser.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async loginUser(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;
            const checkUser = new User(email);
            if (await checkUser.login()) {
                if (bcrypt.compareSync(password, checkUser.result.password)) {
                    return Res.handleSuccess(200, 'successfully logged in', checkUser.result, res);
                }
                return Res.handleError(401, 'wrong password!', res);
            }
            return Res.handleError(404, 'User is not registered. Sign up to create account', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
