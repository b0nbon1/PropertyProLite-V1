import userId from '../database/Users';
import Uid from '../utils/helpers/Ids';
import User from '../Models/UsersModel';
import Res from '../utils/helpers/responses';
import Token from '../utils/helpers/jwt';
import Encrypt from '../utils/helpers/encrypt';

const isAdmin = false;

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
            const hashedPassword = await Encrypt.hash(password);
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
            await newUser.register();
            const token = await Token.newToken({
                email: newUser.result.email,
                id: newUser.result.id,
            });
            return Res.handleSuccess(201, 'successfully created account', token, res);
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
            await checkUser.login();
            if (await Encrypt.check(password, checkUser.result.password)) {
                // eslint-disable-next-line no-shadow
                const { id, email } = checkUser.result;
                const token = await Token.newToken({ email, id });
                return Res.handleSuccess(200, 'successfully logged in', token, res);
            }
            return Res.handleError(401, 'wrong password!', res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }

    static async profile(req, res) {
        try {
            const id = res.locals.user;
            const user = new User(id);
            await user.profile();
            return Res.handleSuccess(200, 'Successful got the data', user.result, res);
        } catch (err) {
            return Res.handleError(500, err.toString(), res);
        }
    }
}
