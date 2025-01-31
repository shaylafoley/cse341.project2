const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/books');
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', contactsController.getAllBooks);

router.get('/:id', contactsController.getSingleBook);

router.post('/', isAuthenticated, validation.saveBook, contactsController.createBook);

router.put('/:id', isAuthenticated, validation.saveBook, contactsController.updateBook);

router.delete('/:id', isAuthenticated, contactsController.deleteBook);

module.exports = router;