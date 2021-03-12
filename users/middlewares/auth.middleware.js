const jwt = require('jsonwebtoken');
const { secret } = require('../config/key');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      return res.status(401).send('Invalid token')
    }

    const decodeData = jwt.verify(token, secret);
    const user = await User.findByPk(decodeData.id);

    if(await User.findOne({ 
      where: { 
        id: decodeData.id
      }}
    )) {
      req.user = user;
      next();
    } else {
      return res.status(401).send("User does not exit or has been deleted")
    }

  } catch (e) {
    return res.status(401).send( 'Sign in, please')
  };
};


module.exports = auth; 
