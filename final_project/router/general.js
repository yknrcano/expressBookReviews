const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 10: Get all books using Promise callbacks
public_users.get('/', function (req, res) {
  // Create a promise that resolves with the books data
  const getBooksPromise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      if (books && Object.keys(books).length > 0) {
        resolve(books);
      } else {
        reject(new Error("No books available"));
      }
    }, 100);
  });

  // Use promise callbacks (.then and .catch)
  getBooksPromise
    .then(booksData => {
      return res.status(200).json(booksData);
    })
    .catch(error => {
      return res.status(500).json({ message: error.message });
    });
});

public_users.get('/axios-demo', async function (req, res) {
    try {
      const simulatedResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: books,
            status: 200,
            statusText: 'OK'
          });
        }, 100);
      });
      
      return res.status(200).json({
        message: "Books retrieved using Promise concept",
        books: simulatedResponse.data
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  // Task 11: Get book details based on ISBN using Promise callbacks
  public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    // Create a promise for fetching book by ISBN
    const getBookByIsbnPromise = new Promise((resolve, reject) => {
      // Simulate async database lookup
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject(new Error("Book not found"));
        }
      }, 100);
    });
  
    // Use promise callbacks
    getBookByIsbnPromise
      .then(bookData => {
        return res.status(200).json({
          message: "Book retrieved successfully using Promises",
          book: bookData
        });
      })
      .catch(error => {
        return res.status(404).json({ message: error.message });
      });
  });

  public_users.get('/isbn-async/:isbn', async function (req, res) {
    try {
      const isbn = req.params.isbn;
      
      const bookData = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = books[isbn];
          if (book) {
            resolve(book);
          } else {
            reject(new Error("Book not found"));
          }
        }, 100);
      });
      
      return res.status(200).json({
        message: "Book retrieved successfully using async-await",
        book: bookData
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

// Task 12: Get book details based on Author using Promise callbacks
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    
    const getBooksByAuthorPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
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
          resolve(matchingBooks);
        } else {
          reject(new Error("No books found by this author"));
        }
      }, 100);
    });
  
    getBooksByAuthorPromise
      .then(booksData => {
        return res.status(200).json({
          message: "Books retrieved successfully using Promises",
          booksbyauthor: booksData
        });
      })
      .catch(error => {
        return res.status(404).json({ message: error.message });
      });
  });
  
  // Alternative Author endpoint using async-await (for reference)
  public_users.get('/author-async/:author', async function (req, res) {
    try {
      const author = req.params.author;
      
      const booksData = await new Promise((resolve, reject) => {
        setTimeout(() => {
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
            resolve(matchingBooks);
          } else {
            reject(new Error("No books found by this author"));
          }
        }, 100);
      });
      
      return res.status(200).json({
        message: "Books retrieved successfully using async-await",
        booksbyauthor: booksData
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  // Task 13: Get book details based on Title using Promise callbacks
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    
    const getBooksByTitlePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
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
          resolve(matchingBooks);
        } else {
          reject(new Error("No books found with this title"));
        }
      }, 100);
    });
  
    getBooksByTitlePromise
      .then(booksData => {
        return res.status(200).json({
          message: "Books retrieved successfully using Promises",
          booksbytitle: booksData
        });
      })
      .catch(error => {
        return res.status(404).json({ message: error.message });
      });
  });
  
  // Alternative Title endpoint using async-await (for reference)
  public_users.get('/title-async/:title', async function (req, res) {
    try {
      const title = req.params.title;
      
      const booksData = await new Promise((resolve, reject) => {
        setTimeout(() => {
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
            resolve(matchingBooks);
          } else {
            reject(new Error("No books found with this title"));
          }
        }, 100);
      });
      
      return res.status(200).json({
        message: "Books retrieved successfully using async-await",
        booksbytitle: booksData
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });


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