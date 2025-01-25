const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/books');
const validation = require('../middleware/validate')

router.get('/', contactsController.getAllBooks);

router.get('/:id', contactsController.getSingleBook);

router.post('/', validation.saveContact, contactsController.createBook);

router.put('/:id', validation.saveContact, contactsController.updateBook);

router.delete('/:id', contactsController.deleteBook);

module.exports = router;