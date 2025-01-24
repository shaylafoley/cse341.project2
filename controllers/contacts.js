const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Contacts']
    mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  };

// const getAll = async (req, res) => {
//     //#swagger.tags=['Contacts']
//     const result = await mongodb.getDatabase().db().collection('contacts').find();
//     result.toArray().then((contacts) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contacts);
//     });
// };

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({ _id: userId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };
// const getSingle = async (req, res) => {
//     //#swagger.tags=['Contacts']
//     const contactId = new ObjectId(req.params.id);
//     const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId});
//     result.toArray().then((contacts) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contacts[0]);
//     });
// };

const createContact =async(req, res) => {
    //#swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        MarriedOrSingle: req.body.MarriedOrSingle,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();

    }else {
        res.status(500).json(response.error || 'Error occurred while updating the contact');
    
    }
};

const updateContact =async(req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
      }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        MarriedOrSingle: req.body.MarriedOrSingle,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();

    }else {
        res.status(500).json(response.error || 'Error occurred while updating the contact');
    
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
      }
    const contactId = new ObjectId(req.params.id);
    
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
}; 

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};