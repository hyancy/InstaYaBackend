const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
/**
 * @param { Number } _id user._id
 * @param { String } _id user.username
 * @return { String }
 */


function generateAccessToken(id, username) {
    return jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '1d' });
}

/**
 * @param {String} token
 * @return {{ _id:Number, username: String }}
 */

function verifyAccessToken(token) {   
    return jwt.verify(token, JWT_SECRET); 
}   

module.exports = {
    generateAccessToken,
    verifyAccessToken
}


