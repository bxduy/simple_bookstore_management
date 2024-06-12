import db from '../models/index.js';

const Book = db.book;

// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, author, description, published_year } = req.body;
        const book = await Book.create({ title, author, description, published_year });
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, published_year } = req.body;

        const [updated] = await Book.update({ title, author, description, published_year }, {
            where: { id: id }
        });

        // Update successful
        if (updated) {
            const updatedBook = await Book.findOne({ where: { id: id } });
            return res.status(200).send(updatedBook);
        }
        throw new Error('Book not found');
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({
            where: { id: id }
        });

        // Delete successful
        if (deleted) {
            return res.status(200).send({ message: "Book deleted" });
        }
        throw new Error("Book not found");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Find a book by id
export const findBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id: id } });

        // Book found
        if (book) {
            return res.status(200).send(book);
        }
        throw new Error("Book not found");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Get all book
export const findAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};