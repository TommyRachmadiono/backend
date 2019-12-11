const router = require('express').Router()
const sc = require('http-status-codes')

const auth = require('../middlewares/auth')

const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(sc.CREATED).send({ user, token })
  } catch (error) {
    res.status(sc.BAD_REQUEST).send({ error })
  }
})

router.post('/login', async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findByCredentials({ email, password })
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(sc.INTERNAL_SERVER_ERROR).send({ error })
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => token !== req.token)
    await req.user.save()
    res.sendStatus(sc.OK)
  } catch (error) {
    res.status(sc.INTERNAL_SERVER_ERROR).send({ error })
  }
})

router.post('/logout_all', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.sendStatus(sc.OK)
  } catch (error) {
    res.status(sc.INTERNAL_SERVER_ERROR).send({ error })
  }
})

router.get('/users', auth, async (_req, res) => {
  try {
    const users = await User.find({})
    res.send({ users })
  } catch (error) {
    res.status(sc.INTERNAL_SERVER_ERROR).send({ error })
  }
})

router.get('/users/me', auth, async ({ user, token }, res) => {
  res.send({ user, token })
})

module.exports = router
