import express from 'express';
import {getTodos,createTodo,updateTodo,deleteTodo} from '../controllers/todoController.js';
import authenticateUser from '../middlewares/athenticateUser.js';
const router = express.Router();

router.use(authenticateUser);
router.get('/',getTodos);
router.post('/',createTodo);
router.patch('/:id',updateTodo);
router.delete('/:id',deleteTodo);

export default router;