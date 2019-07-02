import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Res from '../helpers/responses';
import User from '../../Models/UsersModel';

dotenv.config();

const checkToken = (req) => {
    const HeaderToken = req.headers.authorization;
    if (typeof HeaderToken === 'undefined' || HeaderToken === '') return false;
    return HeaderToken.split(' ')[1];
};

const userToken = async (req, res, next) => {
    if (!await checkToken(req)) return Res.handleError(403, 'Token required', res);
    const token = await checkToken(req);
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) return Res.handleError(403, err.message, res);
        const user = User.getUser(data.email);
        res.locals.user = user;
        next();
    });
};

export default { userToken };
