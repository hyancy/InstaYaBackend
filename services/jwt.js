const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

/**
 *
 * @param {ObjectId} _id user._id
 * @param {String} username user.username
 * @returns {String}
 */

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '1d' });
}

/**
 *
 * @param {String} token
 * @returns {{ _id: ObjectId, email: username }}
 */
function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};