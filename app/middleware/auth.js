require('dotenv').config();

const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');

const auth = (req, res, next) => {
  try {
    const authorization = req.headers['authorization'] || '';

    if (!authorization.startsWith('JWT ')) {
      throw { messages: 'Authorization token must be provided !' };
    }
    const token = authorization.slice(4, authorization.length);

    if (!token) {
      res.status(403).json({
        messages: 'Forbidden access'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw { messages: 'invalid token! ' };
    }

    const user = UserModel.findById(decoded.user._id);
    if (!user) {
      throw { messages: 'related user is not exist! ' };
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = auth;
