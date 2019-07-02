import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Res from './responses';
import User from '../../Models/UsersModel';

dotenv.config();

const newToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 24 * 7,
    });
    return token;
};

const userToken = (req, res, next) => {
    const HeaderToken = req.headers.authorization;
    if (typeof HeaderToken === 'undefined' || HeaderToken === '') return Res.handleError(403, 'Token required', res);
    const token = HeaderToken.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) return Res.handleError(403, err.message, res);
        const user = User.getUser(data.email);
        res.locals.user = user;
        next();
    });
};

export default { newToken, userToken };
