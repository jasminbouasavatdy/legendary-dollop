const {
  Schema,
  model,
  Types
} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address'],
    
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  }, 
],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
  },
],
},
{
  // allow virtuals to be used
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

const User = model('user', userSchema);

module.exports = User;