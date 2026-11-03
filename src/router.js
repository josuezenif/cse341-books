import express from "express";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";

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

export default router;
