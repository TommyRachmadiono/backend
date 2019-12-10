const jwt = require('jsonwebtoken')
const sc = require('http-status-codes')
const User = require('../models/User')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.APP_SECRET || 'supersecret')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error('User not found')
    }

    req.token = token
    req.user = user

    next()
  } catch (e) {
    res.sendStatus(sc.UNAUTHORIZED)
  }
}

module.exports = auth
