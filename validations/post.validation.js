const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required(),

  content: Joi.string()
    .trim()
    .required(),
});


const updatePostSchema = Joi.object({
  title: Joi.string().trim(),
  content: Joi.string().trim(),
}).min(1);

module.exports = {
  createPostSchema,
    updatePostSchema,
};