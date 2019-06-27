import Res from '../helpers/responses';
import Regex from '../helpers/Regexes';

export default class Validations {
    static async validateUser(req, res, next) {
        try {
            const {
                firstname,
                lastname,
                address,
                email,
                phoneNumber,
                password,
            } = req.body;
            if (!firstname || !lastname || !address || !email || !phoneNumber || !password) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (await Regex.nameCheck(firstname)) return Res.handleError(400, 'enter valid firstname', res);
            if (await Regex.nameCheck(lastname)) return Res.handleError(400, 'enter valid lastname', res);
            if (await Regex.addressCheck(address)) return Res.handleError(400, 'address validation failed', res);
            if (await Regex.phoneCheck(phoneNumber)) return Res.handleError(400, 'Enter valid phone Number', res);
            if (await Regex.passCheck(password)) return Res.handleError(400, 'enter valid password. should be 6 character and more and contain letters and numbers', res);
            if (await Regex.emailCheck(email)) return Res.handleError(400, 'enter valid email e.g user@gmail.com', res);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }

    static async validateLogin(req, res, next) {
        try {
            const {
                email,
                password,
            } = req.body;
            // console.log(req.body);
            if (!email || !password) {
                return Res.handleError(400, 'Please fill all the fields', res);
            }
            if (await Regex.passCheck(password)) return Res.handleError(400, 'enter valid password. should be 6 character and more and contain letters and numbers', res);
            if (await Regex.emailCheck(email)) return Res.handleError(400, 'enter valid email e.g user@gmail.com', res);
            next();
        } catch (error) {
            return Res.handleError(500, error.toString(), res);
        }
    }
}
