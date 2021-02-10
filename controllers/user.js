const { bookDB, cartDB } = require('../db/');

function addBooksToCart(userId, books) {
  // TODO rewrite logic due to new cart structure
  // TODO create and use user controller/router
}

function getNotFoundBooks(booklist) {
  const existingBookTitles = bookDB.map((book) => book.title);

  return booklist.filter(({ title }) => !existingBookTitles.includes(title));
}

function putBooksInCart(req, res) {
  const { userId } = req.params;
  const booklist = req.body;

  const notFoundBooks = getNotFoundBooks(booklist);

  if (notFoundBooks.length) {
    res.status(400).send(`Could not find book title: ${notFoundBooks.join()}`);
    return;
  }

  addBooksToCart(userId, booklist);

  res.status(200).send('data received');
}

function findUserByFirstOrLastName(req, res) {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;

  let record = userDB.find((entry) => {
    if (entry.firstName === firstName || entry.lastName === lastName) {
      return entry;
    }
  });

  res.status(200).json(record);
}

function createUserEntry(req, res) {
  let { username, firstName, lastName, email, password } = req.body;

  let user = userDB.find((entry) => {
    if (entry.username === username) return entry;
  });

  if (user) {
    res.status(409).send('username is already in use');
    return;
  }

  userDB.push({
    id: userDB.length,
    username: username,
    firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  res.status(200).send('added a customer record');
}

module.exports = {
  findUserByFirstOrLastName,
  createUserEntry,
  putBooksInCart,
};
