# Personal library

A simple API for posting books to a personal library and adding comments. Books that have been added can be deleted.

## User stories

1. Nothing from my website will be cached in my client as a security measure.
2. I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.
3. I can **POST** a title to /api/books to add a book and returned will be the object with the `title` and a unique `_id`.
4. I can **GET** /api/books to retrieve an aray of all books containing `title`, `_id`, & `commentcount`.
5. I can **GET** /api/books/{_id} to retrieve a single object of a book containing `title`, `_id`, & an array of comments (empty array if no comments present).
6. I can **POST** a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.
7. I can **DELETE** /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
8. If I try to request a book that doesn't exist I will get a 'no book exists' message.
9. I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
10. All functional tests required are complete and passing.