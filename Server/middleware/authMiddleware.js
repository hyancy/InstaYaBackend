const { verifyAccessToken } = require('../services/jwt');
const ApiError = require('../utils/ApiError');

function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
    try {
        if (accessToken == null || accessToken == "" || accessToken.length == 0) {
            throw new ApiError('Access token Invalid', 401);
        }
        const user = verifyAccessToken(accessToken);

        if (user._id && user.username) {
            console.log('Authentication successful')
        }

        next();
    } catch ({ message, statusCode }) {
        res.status(401).json({ message: 'Access denied. Access token Invalid'});
     }
}

module.exports = {
    authMiddleware,
};