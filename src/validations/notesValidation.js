import Joi from 'joi';
import { TAGS } from '../constants/tags.js';


const objectIdSchema = Joi.string().custom((value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('Invalid note id');
  }
  return value;
}, 'ObjectId validation');


export const getAllNotesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(5).max(20).default(10),
  tag: Joi.string().valid(...TAGS).optional(),
  search: Joi.string().allow('').optional(),
});


export const noteIdSchema = Joi.object({
  noteId: objectIdSchema.required(),
})


export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().allow('').optional(),
  tag: Joi.string().valid(...TAGS).optional(),
});


export const updateNoteSchema = Joi.object({
  noteId: objectIdSchema.required(),
  title: Joi.string().min(1).optional(),
  content: Joi.string().allow('').optional(),
  tag: Joi.string().valid(...TAGS).optional(),
}).or('title', 'content', 'tag'); 