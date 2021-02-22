const { bookRepository } = require('../repositories');

function getNotFoundBooks(booklist) {
  const existingBookTitles = bookRepository
    .getAllBooks()
    .map((book) => book.title);

  return booklist.filter(({ title }) => existingBookTitles.includes(title));
}

function createBook(author, title, pages) {
  bookRepository.addBook(author, title, pages);
}

function getBook(id) {
  return bookRepository.getBookWithId(id);
}

function getAllBooks() {
  return bookRepository.getAllBooks();
}

function updateBook(bookData) {
  bookRepository.updateBookWithId(bookData);
}

function deleteBook(id) {
  bookRepository.deleteBookWithId(id);
}

module.exports = {
  getNotFoundBooks,
  createBook,
  getBook,
  updateBook,
  getAllBooks,
  deleteBook,
};
