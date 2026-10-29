import { getAllBooks, getBookById } from "../models/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        return res.status(200).json(allBooks);
    }

    catch (error) {
        console.error('GET/books failed to load:', error.message);
        return res.status(500).json({ message: 'Internal serice error' });
    }
}

const getBookByIdHandler = async (req, res) => {
    try {
        const bookId = req.params._id;
        const book = await getBookById(bookId);

        if (!book) {
            console.error('Book was not found!');
            return res.status(404).json({ message: 'Book not found!' });
        }
        return res.status(200).json(book);
    }

    catch (error) {
        console.error('GET/book/:id failed to load:', error.message);
        return res.status(500).json({ message: 'Internal service error!' });
    }
}

export { getBooksHandler, getBookByIdHandler };