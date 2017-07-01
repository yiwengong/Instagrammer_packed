const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema= new Schema({
  image: String,
  content: String,
  likes: Number,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
