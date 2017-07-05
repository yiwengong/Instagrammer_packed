const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema= new Schema({
  image: {
    type:String,
    require: true
  },
  content: String,
  likes: Number,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  timeField:Number,
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
