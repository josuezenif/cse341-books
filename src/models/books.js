import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const db = getDb();
    const allBooks = await db.collection('books').find({}).toArray();
    return allBooks;
}

export { getAllBooks };