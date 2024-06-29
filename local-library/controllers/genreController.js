const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Genre = require('../models/genre');
const Book = require('../models/book');

const genre_list = asyncHandler(async (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Genre list');
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render('genre_list', { title: 'All Genres', genre_list: allGenres });
});

const genre_detail = asyncHandler(async (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec()
  ]);

  if (!genre) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }

  res.render('genre_detail', {
    title: 'Genre Details',
    genre: genre,
    books_in_genre: booksInGenre
  });
});

const genre_create_get = /* asyncHandler */ async (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Genre create GET');
  res.render('genre_form', { title: 'Create Genre' });
};

// const genre_create_post = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Genre create POST');
// });
const genre_create_post = [
  body('name', 'Genre name must contain atleast 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array()
      });
      return;
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name })
        .collation({ locale: 'en', strength: 2 })
        .exec();

      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  })
];

const genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete GET');
});

const genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete POST');
});

const genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET');
});

const genre_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
});

module.exports = {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post
};
