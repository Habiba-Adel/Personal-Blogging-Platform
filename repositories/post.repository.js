const prisma = require("../config/prisma");

const createPost = async (data) => {
  return prisma.post.create({
    data,
  });
};

const getAllPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const findPostById = async (id) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

const updatePost = async (id, data) => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

const deletePost = async (id) => {
  return prisma.post.delete({
    where: { id },
  });
};

module.exports = {
  createPost,
  getAllPosts,
  findPostById,
  updatePost,
  deletePost,
};