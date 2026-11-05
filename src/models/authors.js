import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
    const authors = await getDb().collection('authors').find({}).toArray();
    return authors;
};

const getAuthorById = async (authorId) => {
    const author = await getDb().collection('authors').findOne({ _id: authorId });
    return author;
}

// CREATING NEW AUTHOR
const createAuthor = async (author) => {
    await getDb().collection('authors').insertOne(author);
    return author;
}

// UPDATING AUTHOR
const updateAuthor = async (id, newAuthorInfo) => {
    await getDb().collection('authors').updateOne({ _id: id }, { $set: newAuthorInfo }); // _id Potential error
    return { id, newAuthorInfo };
}

const deleteAuthor = async (authorId) => {
    const deletedAuthor = await getDb().collection('authors').deleteOne({ _id: authorId }); // _id potential error 
    return deletedAuthor;
}

const authorHasBooks = async (id) => {
    const count = getDb().collection('books').countDocuments({ authorId: id }); // id is author id
    return count > 0;
}

export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks };