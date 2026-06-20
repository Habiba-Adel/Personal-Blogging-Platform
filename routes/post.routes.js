const express = require("express");

const router = express.Router();

const postController = require("../controllers/post.controller");

const protect = require("../middlewares/auth.middleware");

const validationMiddleware = require("../middlewares/validation.middleware");

const {
  createPostSchema,
  updatePostSchema
} = require("../validations/post.validation");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management
 */



/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get(
  "/",
  postController.getPosts
);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 */
router.post(
  "/",
  protect,
  validationMiddleware(createPostSchema),
  postController.createPost
);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.put(
  "/:id",
  protect,
  validationMiddleware(updatePostSchema),
  postController.updatePost
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id",
  protect,
  postController.deletePost
);

module.exports = router;