const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ 
      message: "Username and password are required" 
    });
  }

  if (!isValid(username)) {
    return res.status(400).json({ 
      message: "Username must be at least 3 characters long and contain only letters and numbers" 
    });
  }

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ 
      message: "Username already exists" 
    });
  }

  users.push({ username, password });
  return res.status(201).json({ 
    message: "User registered successfully" 
  });
});

// Task 1: Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const matchingBooks = {};
  
  const bookKeys = Object.keys(books);
  
  for (let i = 0; i < bookKeys.length; i++) {
    const isbn = bookKeys[i];
    const book = books[isbn];
    
    if (book.author.toLowerCase().includes(author.toLowerCase())) {
      matchingBooks[isbn] = book;
    }
  }
  
  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).json({ booksbyauthor: matchingBooks });
  } else {
    return res.status(404).json({ message: "No books found by this author" });
  }
});

// Task 4: Get book details based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const matchingBooks = {};
  
  const bookKeys = Object.keys(books);
  
  for (let i = 0; i < bookKeys.length; i++) {
    const isbn = bookKeys[i];
    const book = books[isbn];
    
    if (book.title.toLowerCase().includes(title.toLowerCase())) {
      matchingBooks[isbn] = book;
    }
  }
  
  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).json({ booksbytitle: matchingBooks });
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;