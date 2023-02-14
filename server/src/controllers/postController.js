import Post from "../models/Post.js";
import User from "../models/User.js";

const LIMIT = 10;

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const page_size = parseInt(limit) || LIMIT;
      let posts = [];
      if (page) {
        const skip = (parseInt(page) - 1) * page_size;
        posts = await Post.find({})
          .populate({
            path: "userId likes",
            select: "avatar fullname username",
          })
          .skip(skip)
          .limit(page_size);
      } else {
        posts = await Post.find({})
          .populate({
            path: "userId likes",
            select: "avatar fullname username",
          })
          .limit(page_size);
      }
      return res.status(200).json({
        msg: "All posts",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createNewPost: async (req, res) => {
    try {
      const { description, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please add your photo." });

      const newPost = new Post({
        description,
        images,
        userId: req.user.id,
      });

      const results = await (
        await newPost.save()
      ).populate({
        path: "userId likes",
        select: "avatar fullname username",
      });

      // await User.findByIdAndUpdate(req.user.id, {
      //   $push: { posts: results._id },
      // });

      return res.status(200).json({
        msg: "Create new post success",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { description, images } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          description,
          images,
        },
        { new: true }
      ).populate("userId likes", "avatar username fullname");
      return res.status(200).json({
        msg: "Update post success",
        data: updatedPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  savedPost: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostsUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { page, limit } = req.query;
      const page_size = parseInt(limit) || LIMIT;
      const skip = (parseInt(page) - 1) * page_size;

      const posts = await Post.find({ userId: userId })
        .skip(skip)
        .limit(page_size);

      return res.status(200).json({
        msg: "Get Posts",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.params.postId;

      const post = await Post.findOne({ _id: postId, likes: userId });
      if (post)
        return res.status(400).json({
          msg: "You liked this post",
        });

      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
      return res.status(200).json({
        msg: "Like post",
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const userId = req.user.id;
      const postId = req.params.postId;

      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
      return res.status(200).json({
        msg: "UnLike post",
        data: newPost,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default postController;
