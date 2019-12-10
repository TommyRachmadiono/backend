const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator').default

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address')
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

const User = model('User', UserSchema)

UserSchema.methods.generateAuthToken = async () => {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.APP_SECRET || 'supersecret'
  )

  this.tokens.push({ token })
  await this.save()
}

UserSchema.statics.findByCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid password')
  }

  return user
}

UserSchema.pre('save', async next => {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

module.exports = User
