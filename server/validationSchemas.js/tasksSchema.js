const Joi = require("joi");

const taskIdSchema = Joi.object({
  taskId: Joi.number().integer().min(1).positive().required(),
}).unknown(true);

const taskCreateSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255).required(),
  completed: Joi.boolean(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  description: Joi.string().min(1).max(255),
  completed: Joi.boolean(),
});

module.exports = { taskIdSchema, taskCreateSchema, taskUpdateSchema };
