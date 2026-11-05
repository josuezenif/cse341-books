# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## FEATURE 2: Author CRUD Operations

# AUTHORS API Week02 Version 1 Spec

### Goal
Implement and describe the Author's collection. It will be referenced to the 'Books' collection by adding the AuthorId to each Book document. Implement and write the routes to GET/authors and GET/authors/:id and all other CRUD routes

### Data Model 
Authors documents will be placed inside the `Authors` collection of the database. 

Required author fields:
- `id`: string, required, custom id such as `au1`
- `name`: string, required
- `birthYear`: string, format in `1923`, required

Authors will still be using a custom id instead of the given `_id` value of MongoDB for parameters

### Relationship to Books
Each book will be attributed an author with the authorId. In the Books document, each book will have a field of `authorId` and that field will have the string of their author. For example:

{
    "id": "b1", 
    "authorId": "au2", 
    "title": "example Title:, 
    "publicationDate": "2019-2-18"
}

### ROUTES

## GET /authors
Purpose: Return a JSON array of all authors

Success: 
- Status code: `200``
- Response body: an array of all authors

Example:

[
    {
        "id": "au1", 
       "name": "Juan Gerardo", 
       "birthYear": "1921" 
    }, 
    {
        "id": "au2", 
        "name": "Richard Parker", 
        "birthYear": "2001" 
    }
]

Errors status codes:
- `500` if an unexpected error during database retrieval occurs

Example:

{
    "message": "Internal service error"
}

## GET /authors/:id
Purpose: Return one author information by its single id.

Success: 
- Status code: `200`
- Response body: the author object for matching id.

Example:

{
    "id": "au1", 
    "name": "Juan Gerardo", 
    "birthYear": "1921-03-24" 
}

Errors: 
- `404`: no book was found for given id
- `500`: an unexpected service error occurred during author retrieval

Examples:

`404`
{
    "message": "Author not found!"
}

`500`
{
    "message": "Internal service error"
}

## POST /authors
Purpose: Create a new author 

Request body:
    {
        "id": "au1", 
        "name": "Juan Gerardo", 
        "birthYear": "1921-03-24" 
    }

Success: 
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
      "id": "au2",
      "name": "Updated Book Title",
      "birthYear": "2003"
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Request body: 
{
    "authorId": "au2:
}

Success:
- Status code: `204`
- Response body: none or message stating that the author has been successfully deleted.

Errors:
- `400` Bad request, if user tries to delete author but still has books related to it.
- `400` if no author id is present in the req.params body
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

If the client tries to delete an author that still has related books associated, block the delete and send a safe error message saying something like:

{
    "message: "Author can't be deleted. Still has books related to it"
}

### Swagger Documentation
Swagger must document all CRUD routes and be able to test them locally with no errors and then deployed on Render, also with no errors.

### Deployment Expectations
After implementation, all CRUD routes must work locally using the https://127.0.0.1.3000. After, the changes must be committed to Github and deployed the Render app. App must be well working with no errors.

