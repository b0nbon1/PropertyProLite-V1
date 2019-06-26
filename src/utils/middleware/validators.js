import Res from '../helpers/responses';

export default class Validations {
    static async validateRegisterUser(req, res, next) {
        try {
            const {
                firstname,
                lastname,
                address,
                email,
                phoneNumber,
                password,
            } = req.body;
            let re;

            if (!firstname || !lastname || !address || !email || !phoneNumber || !password) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (firstname) {
                re = /[a-zA-Z]{3,}/;
                if (!re.test(firstname)) return Res.handleError(400, 'enter valid firstname', res);
            }
            if (lastname) {
                re = /[a-zA-Z]{3,}/;
                if (!re.test(lastname)) return Res.handleError(400, 'enter valid lastname', res);
            }
            if (address) {
                re = /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/;
                if (!re.test(address)) return Res.handleError(400, 'address validation failed', res);
            }
            if (phoneNumber) {
                re = /^(?:\+\d{0,3})?\d{10,15}(?:,(?:\+\d{2})?\d{10,15})*$/;
                if (!re.test(phoneNumber)) return Res.handleError(400, 'Enter valid phone Number', res);
            }
            if (password) {
                re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
                if (!re.test(password)) return Res.handleError(400, 'enter valid password. should be 6 character and more and contain letters and numbers', res);
            }
            if (email) {
                re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
                if (!re.test(email)) return Res.handleError(400, 'enter valid email e.g user@gmail.com', res);
            }
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }
}
