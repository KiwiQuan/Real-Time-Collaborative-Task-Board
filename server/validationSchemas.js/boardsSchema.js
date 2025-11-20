const Joi = require("joi");

const boardIdSchema = Joi.object({
  boardId: Joi.number().integer().min(1).positive().required(),
});

const boardCreateSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255).required(),
});

const boardUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  description: Joi.string().min(1),
});

module.exports = { boardCreateSchema, boardIdSchema, boardUpdateSchema };
