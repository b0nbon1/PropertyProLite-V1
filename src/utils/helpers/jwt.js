import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const newToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 24 * 7,
    });
    return token;
};

export default { newToken };
