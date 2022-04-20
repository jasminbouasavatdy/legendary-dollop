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

// TODO: create a virtual that retrieves the length of a user's friends array field on query.
// Create a virtual called friendCount
// that retrieves the length of the user 's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;