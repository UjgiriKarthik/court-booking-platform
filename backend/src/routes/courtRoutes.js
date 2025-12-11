import { Router } from 'express';
import { listCourts, createCourt, updateCourt } from '../controllers/courtController.js';
import { requireAuth } from '../middleware/auth.js';
const r = Router();
r.get('/', listCourts);
r.post('/', requireAuth(['admin']), createCourt);
r.patch('/:id', requireAuth(['admin']), updateCourt);
export default r;
