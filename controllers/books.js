const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const result = await mongodb.getDatabase().db().collection('books').find()
        .toArray();
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(result);
    }  catch (error) {
        res.status(400).json({ message: err });
    }
  }

const getSingleBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId})
     .toArray();
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(result[0]);
    } catch (error)  {
          res.status(400).json({ message: error.message });
      }
  };


const createBook =async(req, res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearPublished: req.body.yearPublished
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();

    }else {
        res.status(500).json(response.error || 'Error occurred while updating the book');
    
    }
};

const updateBook =async(req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
      }
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        yearPublished: req.body.yearPublished
    };
    const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id: bookId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();

    }else {
        res.status(500).json(response.error || 'Error occurred while updating the book');
    
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
      }
    const bookId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book.');
    }
}; 

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};