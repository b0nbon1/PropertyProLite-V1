export default class Responses {
    static handleAuth(statusCode, message, data, res) {
        res.status(statusCode).json({
            status: statusCode,
            message,
            data,
        });
    }

    static handleSuccess(statusCode, message, data, res) {
        res.status(statusCode).json({
            status: statusCode,
            message,
            data,
        });
    }

    static handleError(statusCode, message, res) {
        res.status(statusCode).json({
            status: statusCode,
            message,
        });
    }
}
