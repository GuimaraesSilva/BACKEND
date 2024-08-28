// import { Router } from 'express';
// import { getAll, create, update, delete } from '../controllers/movieController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = Router();

// router.get('/', protect, getAll);
// router.post('/', protect, admin, create);
// router.put('/:id', protect, admin, update);
// router.delete('/:id', protect, admin, delete);

// export default router;

import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAll, create, update, delete } from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', protect, admin, create);
router.put('/:id', protect, admin, update);
router.delete('/:id', protect, admin, delete);

export default router;
