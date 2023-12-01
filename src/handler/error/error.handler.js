const ApiError = require('./api.error');

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.code).json({
            status: err.code,
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 500,
        success: false,
        message: 'Something went wrong',
    });
};

module.exports = ErrorHandler;
