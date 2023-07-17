const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}


module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user
        
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update user

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the platform
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }



      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //create a friend
  async createFriend(req, res) {
    try {
      const friends = await User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: { friends: req.params.friendId}}, { new: true});
      if(!friends) {
        return res.status(404).json({ message: "no user with that id"})
      }
      res.json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //remove friend
  async removeFriend(req, res) {
    try {
      const friends = await User.findOneAndUpdate({ _id: req.params.userId}, { $pull: { friends: req.params.friendId}}, { new: true});
      if(!friends) {
        return res.status(404).json({ message: "no user with that id"})
      }
      res.json(friends);
    } catch (err) {
      res.status(500).json(err);
    }
  },

}


