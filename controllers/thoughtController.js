const { Thought, User } = require('../models');
const userController = require('./userController');

module.exports = {
  // Get all Thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(req.body);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true });
      })
      .then((user) =>
        !user ?
          res
            .status(404)
            .json({
              message: 'Post created, but found no user with that ID'
            }) :
          res.json('Yay! Created the post and updated user with thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json({ message: 'Thought deleted!' })
      )
      .catch(() => res.status(500).json());
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(reactions => {
        if (!reactions) {
          res.status(404).json({ message: 'No thought found at this id!' });
          return;
        }

        res.json(reactions);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // delete a reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(reactions => {
        if (!reactions) {
          res.status(404).json({ message: 'No thoughts found at this id!' });
          return;
        }
        res.json({ message: 'Thought deleted!' })

      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};
