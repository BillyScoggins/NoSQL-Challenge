const { Schema, Types } = require('mongoose');


// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 50,
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
      type: String,
      required: true,
      max_length: 50,
    },
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);



module.exports = reactionSchema;
