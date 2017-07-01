const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema= new Schema({
  comment: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
