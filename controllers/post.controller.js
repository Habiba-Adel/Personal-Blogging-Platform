const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");

const postService = require("../services/post.service");

const getPosts = catchAsync(
  async (req, res) => {
    const posts =
      await postService.getAllPosts();

    sendResponse(res, {
      data: posts,
    });
  }
);

const createPost = catchAsync(
  async (req, res) => {
    const { title, content } = req.body;

    const post =
      await postService.createPost(
        title,
        content,
        req.user.id
      );

    sendResponse(res, {
      statusCode: 201,
      message:
        "Post created successfully",
      data: post,
    });
  }
);

const updatePost = catchAsync(
  async (req, res) => {
    const post =
      await postService.updatePost(
        req.params.id,
        req.user.id,
        req.body
      );

    sendResponse(res, {
      message:
        "Post updated successfully",
      data: post,
    });
  }
);

const deletePost = catchAsync(
  async (req, res) => {
    await postService.deletePost(
      req.params.id,
      req.user.id
    );

    sendResponse(res, {
      message:
        "Post deleted successfully",
    });
  }
);

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};