const { Schema, model, Types} = require('mongoose');
// const { username } = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  },
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
  },
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now(),
      // get: createdAtVal => dateFormat(createdAtVal)
    }
  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // get: createdAtVal => dateFormat(createdAtVal)
    },
    username: [
      {
        type: String,
        ref: 'user',
      },
    ],
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
