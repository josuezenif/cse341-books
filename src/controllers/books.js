import { getAllAuthors } from "../models/authors.js";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../models/books.js";

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

const createBookHandler = async (req, res) => {
    try {
        const { _id, authorId, title, publicationDate } = req.body;

        if (!_id || !authorId || !title || !publicationDate) {
            console.log(_id, authorId, title, publicationDate);
            return res.status(400).json({ message: "New book id, authorId, title, and publicationDate are all required!" });
        }

        const books = await getAllBooks();
        books.forEach(book => {
            if (book._id == _id) {
                return res.status(400).json({ message: "New book id can't be the same as existing ids!" });
            }
            return null;
        });

        const authors = await getAllAuthors();
        const authorExists = authors.some(author => { return author._id == authorId }); // recorre cada objeto (author.id) y responde true if author._id === authorId

        if (authorExists == false) { // has to match
            return res.status(400).json({ message: "Author id does not match any existing ids!" });
        }

        const bookInfo = { _id, authorId, title, publicationDate };
        const newBook = await createBook(bookInfo);
        return res.status(201).json(newBook);
    }

    catch (error) {
        return res.status(500).json({ message: "Unable to create book! Internal service error" });
    }
}

const updateBookHandler = async (req, res) => {
    try {
        const bookId = req.params._id;
        const { authorId, title, publicationDate } = req.body;

        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({ message: "All parameters are required!" });
        }
        const authors = await getAllAuthors();
        const existingAuthor = authors.some(author => { return author._id === authorId });

        if (existingAuthor == false) {
            return res.status(400).json({ message: "Author ID does not match with existing ids!" });
        }

        const existingBook = await getBookById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: "No book found with given ID!" });
        }

        const newBook = { authorId, title, publicationDate };
        const updatedBook = await updateBook(bookId, newBook);
        return res.status(200).json(updatedBook);
    }

    catch (error) {
        return res.status(500).json({ message: "Unable to update book! Internal service error" });
    }
}

const deleteBookHandler = async (req, res) => {
    try {
        const bookId = req.params._id;
        const book = await getBookById(bookId);

        if (!book) {
            return res.status(404).json({ message: "No book found" });
        }


        const deleteMessage = await deleteBook(bookId);
        return res.status(204).json({ message: deleteMessage });
    }

    catch (error) {
        return res.status(500).json({ message: "Unable to delete book! Internal service error" });
    }
}

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };