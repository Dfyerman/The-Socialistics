const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
          );
    
          if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with that ID' });
          }
    
          res.json(updatedUser);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async deleteUser(req, res) {
        try {
          const deletedUser = await User.findByIdAndDelete(req.params.userId);
    
          if (!deletedUser) {
            return res.status(404).json({ message: 'No User found with that ID' });
          }
    
          res.json({ message: 'User deleted successfully' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.body.friendId;
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            if (!mongoose.Types.ObjectId.isValid(friendId)) {
                return res.status(400).json({ error: 'Invalid friendId' });
            }
    
            user.friends.push(friendId);
            await user.save();
            res.json(user);
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async removeFriend(req, res) {
      try {
          const userId = req.params.userId;
          const friendId = req.body.friendId;
  
          const user = await User.findById(userId);
  
          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }
  
          if (!mongoose.Types.ObjectId.isValid(friendId)) {
              return res.status(400).json({ error: 'Invalid friendId' });
          }
  
          const friendIndex = user.friends.indexOf(friendId);
          if (friendIndex !== -1) {
              user.friends.splice(friendIndex, 1);
          }
  
          await user.save();
          res.json(user);
      } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
      
};