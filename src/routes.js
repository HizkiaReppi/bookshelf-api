import BookHandler from './handlers.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: BookHandler.addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: BookHandler.getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: BookHandler.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: BookHandler.updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: BookHandler.deleteBook,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (req, h) => {
      const res = h
        .response({
          status: 'fail',
          message: 'Halaman tidak ditemukan',
        })
        .code(404);
      return res;
    },
  },
];

export default routes;
