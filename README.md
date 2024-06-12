# Simple Bookstore Management System

This is a simple bookstore management system built with Node.js, Express, and MySQL. The system supports user registration, login, JWT authentication, and book management features including adding, updating, deleting, and searching for books. Additionally, it has a password reset functionality via email.

## Features

- User registration and login
- JWT-based authentication
- Add, update, delete, and search for books
- Password reset via email

## Technologies Used

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- JWT (JSON Web Tokens)
- Nodemailer


## API Endpoints

### Auth Routes

- **Register**: `POST /api/auth/register`
    - Request body: `{ "username": "your_username", "email": "your_email", "password": "your_password" }`
- **Login**: `POST /api/auth/login`
    - Request body: `{ "username": "your_username", "password": "your_password" }`
- **Forgot Password**: `POST /api/auth/forgot-password`
    - Request body: `{ "email": "your_email" }`
- **Reset Password**: `POST /api/auth/reset-password/:token`
    - Request body: `{ "password": "new_password" }`

### Book Routes

- **Add Book**: `POST /api/books/`
    - Request body: `{ "title": "book_title", "author": "book_author", "description": "book_description", "price": "book_price" }`
- **Update Book**: `PUT /api/books/:id`
    - Request body: `{ "title": "new_title", "author": "new_author", "description": "new_description", "price": "new_price" }`
- **Delete Book**: `DELETE /api/books/:id`
- **Find Book**: `GET /api/books/:id`
- **Find All Books**: `GET /api/books/`
