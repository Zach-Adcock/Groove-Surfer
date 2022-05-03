import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
  const { page } = req.query;
  try {
    //limit albums per page
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; //start index for each page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
  } catch (err) {
    res.status(404).json({message: err.message});
  }
};

export const getPostsBySearch = async (req,res) => {
  const { searchQuery, tags } = req.query

  try {
    const album = new RegExp(searchQuery, 'i');
    const artist = album;
    //find posts with matching title or a matching tag
    const posts = await PostMessage.find({ $or: [ { album }, { artist }, { tags: { $in: tags.split(',') } }]})
    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const createPost = async (req,res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost)
  } catch (err) {
    res.status(409).json({ message: err.message})
  }
};

export const updatePost = async (req,res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No such post exists');



  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });
  res.json(updatedPost);
}


export const deletePost = async (req,res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No such post exists');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted'});
}


export const likePost = async (req,res) => {
  const { id } = req.params;

  //Need to be logged in to like post
  if (!req.userId) return res.json({ message: "Unauthenticated"});
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No such post exists');

  const post = await PostMessage.findById(id);

  //Like/Unlike post if current userId already liked post
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    //unlike post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
  
  res.json(updatedPost);
}