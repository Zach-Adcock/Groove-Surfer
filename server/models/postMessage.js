import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
  artist: String,
  album: String,
  name: String,
  tags: [String],
  selectedFile: String,
  creator: String,
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})


const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;