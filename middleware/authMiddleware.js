const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

  // We will pass token in the following format => "token"

  const accessToken = req.headers['authorization'];

  if (accessToken == null)
  return res.sendStatus(401);

  jwt.verify(accessToken , process.env.JWT_SECRET,(err,data)=>{
    if (err) return res.status(402).send(err);
    req.user = data;
    next();
  })
}

module.exports = {
  authenticateToken,
};
