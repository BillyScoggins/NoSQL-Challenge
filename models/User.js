const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      unique: true,
      trim: true,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;
