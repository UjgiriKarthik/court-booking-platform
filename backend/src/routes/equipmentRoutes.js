import { Router } from 'express';
import { listEquipment, createEquipment, updateEquipment } from '../controllers/equipmentController.js';
import { requireAuth } from '../middleware/auth.js';
const r = Router();
r.get('/', listEquipment);
r.post('/', requireAuth(['admin']), createEquipment);
r.patch('/:id', requireAuth(['admin']), updateEquipment);
export default r;
