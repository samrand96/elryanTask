module.exports = (err, req, res, next) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.code && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    res.status(statusCode).json({
        error: true,
        message
    });

};
