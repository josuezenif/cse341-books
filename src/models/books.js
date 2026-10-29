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

export { getAllBooks, getBookById };