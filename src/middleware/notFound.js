module.exports = (req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
};
