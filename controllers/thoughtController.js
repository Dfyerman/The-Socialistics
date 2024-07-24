const { User, Thought } = require('../models');
const mongoose = require('mongoose');


module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId });

      if (!thought) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new post
  async createThought (req, res) {
    try {
        const { thoughtText, username, userId } = req.body;

        // Create a new thought
        const newThought = await Thought.create({ thoughtText, username });

        // Update the user's thoughts array with the new thought _id
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found with that ID' });
        }

        res.json({ message: 'Thought created successfully', newThought });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.userId);

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;
      const thoughtId = req.params.thoughtId;
  
      // Find the thought based on the thoughtId
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Generate a new ObjectId as a string
      const newReaction = {
        reactionId: new mongoose.Types.ObjectId().toHexString(), // Generate a new ObjectId as a string
        reactionBody,
        username
      };
  
      thought.reactions.push(newReaction);
      await thought.save();
  
      res.json({ message: 'Reaction created successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought
  async removeReaction (req, res)  {
  try {
      const { thoughtId, reactionId } = req.params;

      // Find the thought based on the thoughtId
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
      }

      // Pull and remove the reaction by reactionId
      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
      await thought.save();

      res.json({ message: 'Reaction removed successfully', thought });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  }
};
