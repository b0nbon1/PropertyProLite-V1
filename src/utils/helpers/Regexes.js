let re;
export default class Regex {
    static nameCheck(name) {
        re = /[a-zA-Z]{3,}/;
        if (!re.test(name)) return true;
        return false;
    }

    static addressCheck(address) {
        re = /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/;
        if (!re.test(address)) return true;
        return false;
    }

    static phoneCheck(phoneNumber) {
        re = /^(?:\+\d{0,3})?\d{10,15}(?:,(?:\+\d{2})?\d{10,15})*$/;
        if (!re.test(phoneNumber)) return true;
        return false;
    }

    static emailCheck(email) {
        re = /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/;
        if (!re.test(email)) return true;
        return false;
    }

    static passCheck(password) {
        re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!re.test(password)) return true;
        return false;
    }
}
