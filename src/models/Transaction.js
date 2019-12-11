const { model, Schema, SchemaTypes } = require('mongoose')

const TransactionSchema = new Schema({
  user_id: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  book_id: {
    type: SchemaTypes.ObjectId,
    ref: 'Book',
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 1) {
        throw new Error('Value must be more than 1')
      }
    },
  },
  price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
})

TransactionSchema.pre('save', async function(next) {
  // TODO: add stock checking
  this.total_price = this.qty * this.price
  next()
})

const Transaction = model('Transaction', TransactionSchema)

module.exports = Transaction
