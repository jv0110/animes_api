const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  const access = req.headers.authorization;
  if(!access) return res.status(403).json({
    msg: 'Access denied.'
  });
  
  const [token_name, token_value] = access.split(' ');
  if(token_name !== 'Bearer')
    return res.status(403).json({
      msg: 'Access denied. Token name is not valid'
    });

  await jwt.verify(token_value, process.env.JWT_PASS, (err, decoded) => {
    if(err)
      return res.status(403).json({
        msg: 'Invalid token value'
      });
    req.user_id = decoded.user_id;
    next();
  });
}