import { nanoid } from 'nanoid';
import books from './books.js';

class BookHandler {
  static addBook(req, h) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (!name) {
      const res = h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);

      return res;
    }

    if (readPage > pageCount) {
      const res = h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);

      return res;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const success = books.filter((book) => book.id === id).length > 0;

    if (success) {
      const res = h
        .response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        })
        .code(201);

      return res;
    }

    const res = h
      .response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      })
      .code(500);

    return res;
  }

  static getAllBook(req, h) {
    const { name, reading, finished } = req.query;

    if (!name && !reading && !finished) {
      const res = h
        .response({
          status: 'success',
          data: {
            books: books.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);

      return res;
    }

    if (name) {
      const filteredBooksName = books.filter((book) => {
        const nameRegex = new RegExp(name, 'gi');
        return nameRegex.test(book.name);
      });

      const res = h
        .response({
          status: 'success',
          data: {
            books: filteredBooksName.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);

      return res;
    }

    if (reading) {
      const filteredBooksReading = books.filter(
        (book) => Number(book.reading) === Number(reading),
      );

      const res = h
        .response({
          status: 'success',
          data: {
            books: filteredBooksReading.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        })
        .code(200);

      return res;
    }

    const filteredBooksFinished = books.filter(
      (book) => Number(book.finished) === Number(finished),
    );

    const res = h
      .response({
        status: 'success',
        data: {
          books: filteredBooksFinished.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return res;
  }

  static getBookById(req, h) {
    const { bookId } = req.params;

    const book = books.filter((data) => data.id === bookId)[0];

    if (!book) {
      const res = h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
      return res;
    }

    const res = h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
    return res;
  }

  static updateBook(req, h) {
    const { bookId } = req.params;

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (!name) {
      const res = h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
      return res;
    }

    if (readPage > pageCount) {
      const res = h
        .response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
      return res;
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        updatedAt,
      };

      const res = h
        .response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        })
        .code(200);
      return res;
    }

    const res = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
    return res;
  }

  static deleteBook(req, h) {
    const { bookId } = req.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
      const res = h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
      return res;
    }

    books.splice(index, 1);
    const res = h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
    return res;
  }
}

export default BookHandler;
