import express from 'express';
import {
    createBook,
    updateBook,
    deleteBook,
    findBook,
    findAllBooks
} from '../controllers/book.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);
router.get('/:id', verifyToken, findBook);
router.get('/', verifyToken, findAllBooks);

export default router;