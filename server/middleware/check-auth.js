const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

import {AUTH_FAILED} from '../lib/constant';

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error(AUTH_FAILED);
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError(AUTH_FAILED, 403);
    return next(error);
  }
};
