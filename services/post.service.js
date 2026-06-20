const AppError = require("../utils/AppError");

const postRepository = require("../repositories/post.repository");

const getAllPosts = async () => {
  return postRepository.getAllPosts();
};

const createPost = async (
  title,
  content,
  userId
) => {
  return postRepository.createPost({
    title,
    content,
    authorId: userId,
  });
};

const updatePost = async (
  postId,
  userId,
  data
) => {
  const post =
    await postRepository.findPostById(postId);

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  if (post.authorId !== userId) {
    throw new AppError(
      "Unauthorized",
      403
    );
  }

  return postRepository.updatePost(
    postId,
    data
  );
};

const deletePost = async (
  postId,
  userId
) => {
  const post =
    await postRepository.findPostById(postId);

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  if (post.authorId !== userId) {
    throw new AppError(
      "Unauthorized",
      403
    );
  }

  return postRepository.deletePost(postId);
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};