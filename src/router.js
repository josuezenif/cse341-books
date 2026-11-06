import express from "express";
import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from "./controllers/books.js";
import { getAllAuthorsHandler, getAuthorByIdHandler as getOneAuthor, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler } from "./controllers/authors.js";
import { create } from "node:domain";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 additionalProperties: true
 *       500:
 *         description: The books could not be retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/books', getBooksHandler);

/**
 * @swagger
 * /books/{_id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: No book was found with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The book could not be retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/books/:_id', getBookByIdHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - authorId
 *               - title
 *               - publicationYear
 *             properties:
 *               _id: 
 *                type: string
 *                description: Id of new book
 *               authorId:
 *                 type: string
 *                 description: Author ID of the book.
 *               title:
 *                 type: string
 *                 description: Title of the book.
 *               publicationDate:
 *                 type: string
 *                 description: Publication date of the book. Format "2015-12-31"
 *     responses:
 *       201:
 *         description: The book was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing required book fields or duplicate book ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The book could not be created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/books', createBookHandler);

/**
 * @swagger
 * /books/{_id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - authorId
 *               - publicationDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the book.
 *               authorId:
 *                 type: string
 *                 description: Updated authorId of the book.
 *               publicationDate:
 *                 type: string
 *                 description: Updated publication date of the book. Format "2015-12-31"
 *     responses:
 *       200:
 *         description: The book was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing required fields or invalid update request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No book was found to update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The book could not be updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/books/:_id', updateBookHandler);

/**
 * @swagger
 * /books/{_id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the book to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The book was deleted successfully.
 *       404:
 *         description: No book was found to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The book could not be deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/books/:_id', deleteBookHandler);

// -------------------------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthorsHandler);

/**
 * @swagger
 * /authors/{_id}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get an Author by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the author to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested author.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       404:
 *         description: No author was found with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The author could not be retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/authors/:_id', getOneAuthor);

/**
 * @swagger
 * /authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - name
 *               - birthYear
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Unique author ID.
 *               name:
 *                 type: string
 *                 description: Author name.
 *               birthYear:
 *                 type: integer
 *                 description: Author birth year.
 *     responses:
 *       201:
 *         description: The author was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing required author fields or duplicate ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The author could not be created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/authors', createAuthorHandler);

/**
 * @swagger
 * /authors/{_id}:
 *   put:
 *     tags:
 *       - Authors
 *     summary: Update an author by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the author to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated author name.
 *               birthYear:
 *                 type: integer
 *                 description: Updated author birth year.
 *     responses:
 *       200:
 *         description: The author was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Missing required fields or the author does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No author was found to update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The author could not be updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/authors/:_id', updateAuthorHandler);

/**
 * @swagger
 * /authors/{_id}:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an author by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the author to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The author was deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No author was found to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: The author is associated with books and cannot be deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: The author could not be deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/authors/:_id', deleteAuthorHandler);

export default router;
