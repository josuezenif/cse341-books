import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks } from "../models/authors.js";

const getAllAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    }

    catch (error) {
        return res.status(500).json({ message: "Internal Service Error! Unable to retrieve authors :(" });
    }
}

const getAuthorByIdHandler = async (req, res) => {
    try {
        const authorId = req.params._id;
        const author = await getAuthorById(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found! :(" });
        }

        return res.status(200).json(author);
    }

    catch (error) {
        return res.status(500).json({ message: "Author could not be retrieved! :(" });
    }
}

// CREATING AUTHOR
const createAuthorHandler = async (req, res) => {
    try {
        const { _id, name, birthYear } = req.body;

        if (!_id || !name || !birthYear) {
            return res.status(400).json({ message: "An id, name, and birthYear are all required!" });
        }

        const authors = await getAllAuthors();
        authors.forEach(author => {
            if (_id == author._id) {
                return res.status(400).json({ message: "New author id can't be the same as existing ids" });
            }
            return null;
        });

        const newAuthor = { _id, name, birthYear };
        const createdAuthor = await createAuthor(newAuthor);

        return res.status(201).json(createdAuthor);
    }

    catch (error) {
        return res.status(500).json({ message: "Unable to create new author. Internal database error! :(" });
    }
}

const updateAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params._id; // id is null
        const { name, birthYear } = req.body;

        console.log("Id of author:", authorId);

        const existingAuthor = await getAuthorById(authorId);
        console.log("Author info:", existingAuthor); // is undefined

        if (!existingAuthor) {
            return res.status(404).json({ message: "No author found to be updated!" });
        }
        if (!name || !birthYear) {
            return res.status(400).json({ message: "Name and birth year are required!" });
        }

        const newUpdatedAuthor = await updateAuthor(authorId, { name, birthYear });
        console.log(newUpdatedAuthor);
        return res.status(200).json(newUpdatedAuthor);
    }

    catch (error) {
        return res.status(500).json({ message: "Undable to update author. Internal database error! :(" });
    }
}

const deleteAuthorHandler = async (req, res) => {
    try {
        const authorId = req.params._id;
        const existingAuthor = await getAuthorById(authorId);

        if (!existingAuthor) {
            return res.status(404).json({ message: "No author found to delete!" });
        }

        const booksCount = await authorHasBooks(authorId); // returns boolean (true or false)

        if (booksCount == true) {
            return res.status(409).json({ message: "Author has books related to it! Unable to delete!" });
        }

        await deleteAuthor(authorId);
        return res.status(204).send();
    }

    catch (error) {
        return res.status(500).json({ message: "Unable to delete author! Database internal error!" });
    }
}

export { getAllAuthorsHandler, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler };