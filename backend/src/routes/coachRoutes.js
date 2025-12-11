import { Router } from 'express';
import { listCoaches, createCoach, setAvailability } from '../controllers/coachController.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();
r.get('/', listCoaches);
r.post('/', requireAuth(['admin']), createCoach);
r.patch('/:id/availability', requireAuth(['admin']), setAvailability);

export default r; // <- make sure this line exists
