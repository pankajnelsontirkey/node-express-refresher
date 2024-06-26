const asyncHandler = require('express-async-handler');

const Author = require('../models/author');
const Book = require('../models/book');

const author_list = asyncHandler(async (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Author List');
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render('author_list', { title: 'Author List', author_list: allAuthors });
});

const author_detail = asyncHandler(async (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec()
  ]);

  if (!author) {
    const err = new Error('Author not found');
    err.status = 404;
    return next(err);
  }

  res.render('author_detail', {
    title: 'Author Details',
    author,
    author_books: allBooksByAuthor
  });
});

const author_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create GET');
});

const author_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create POST');
});

const author_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
});

const author_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete POSt');
});

const author_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET');
});

const author_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POSt');
});

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post
};
