import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js'; 

const router = Router();

router.use(authenticate);

router.get('/', celebrate({ query: getAllNotesSchema }), getAllNotes);
router.get('/:noteId', celebrate({ params: noteIdSchema }), getNoteById);
router.post('/', celebrate({ body: createNoteSchema }), createNote);
router.patch('/:noteId', celebrate({ params: noteIdSchema, body: updateNoteSchema }), updateNote);
router.delete('/:noteId', celebrate({ params: noteIdSchema }), deleteNote);

export default router;