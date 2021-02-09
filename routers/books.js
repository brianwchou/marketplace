const { Router } = require('express');
const booksRouter = Router();
const {
  deleteBooks,
  addBookEntry,
  getAllBooks,
  getBookEntry,
  updateBookEntry,
} = require('../controllers/books');

const validIdMiddleware = require('../middlewares');

booksRouter.get('/', getAllBooks);
booksRouter.get('/:id', validIdMiddleware, getBookEntry);
booksRouter.post('/', addBookEntry);
booksRouter.put('/:id', validIdMiddleware, updateBookEntry);
booksRouter.delete('/:id', validIdMiddleware, deleteBooks);

module.exports = booksRouter;