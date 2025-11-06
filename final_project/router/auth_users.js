const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  return usernameRegex.test(username);
};

const authenticatedUser = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  return !!user;
};

// Task 7: Only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,
      username
    };

    return res.status(200).json({ 
      message: "User successfully logged in",
      accessToken: accessToken
    });
  } else {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
});

// Task 8: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (!review) {
    return res.status(400).json({ message: "Review is required" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews) {
    book.reviews = {};
  }

  if (book.reviews[username]) {
    book.reviews[username] = review;
    return res.status(200).json({ 
      message: "Review modified successfully",
      review: review
    });
  } else {
    book.reviews[username] = review;
    return res.status(201).json({ 
      message: "Review added successfully",
      review: review
    });
  }
});

// Task 9: Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews || Object.keys(book.reviews).length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }

  if (book.reviews[username]) {
    delete book.reviews[username];
    return res.status(200).json({ 
      message: "Review deleted successfully" 
    });
  } else {
    return res.status(404).json({ 
      message: "No review found for this user" 
    });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;