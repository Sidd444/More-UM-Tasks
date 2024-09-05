const Post = require('../models/Post');


exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    console.log("server error " + err);
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name');
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching post' });
  }
};

exports.updatePostById = async (req, res) => {
  console.log("server reached");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'User not authorized' });
    }
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.excerpt = req.body.excerpt || post.excerpt;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      console.log("User not authorized");
      return res.status(403).json({ error: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    console.log("Post deleted successfully");
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(400).json({ error: err.message });
  }
};