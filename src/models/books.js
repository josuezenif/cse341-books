import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const db = getDb();
    const allBooks = await db.collection('books').find({}).toArray();
    return allBooks;
}

// Model function to retrieve 1 book information by ID
const getBookById = async (bookId) => {
    const db = getDb();
    const book = await db.collection('books').findOne({ _id: bookId });
    return book;
}

const createBook = async (bookInfo) => {
    await getDb().collection('books').insertOne(bookInfo);
    return bookInfo;
}

const updateBook = async (bookId, updatedBook) => {
    await getDb().collection('books').updateOne({ _id: bookId }, { $set: updatedBook });
    return { bookId, updatedBook };
}

const deleteBook = async (bookId) => {
    await getDb().collection('books').deleteOne({ _id: bookId });
    return "Book deleted";
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };