const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Update a contact
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.send(contact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send(error);
        } else {
            res.status(500).send({ message: 'Server error' });
        }
    }
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).send({ message: 'Contact not found' });
      }
      res.send(contact);
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        res.status(400).send({ message: 'Invalid contact ID' });
      } else {
        res.status(500).send({ message: 'Server error' });
      }
    }
  });
  
// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.send({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
});

// Add a new contact
router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.status(201).send(contact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send(error);
        } else {
            res.status(500).send({ message: 'Server error' });
        }
    }
});

router.get('/', async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
  
      // Convert page and limit to integers
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
  
      // Build the query object for search functionality
      const query = {};
      if (search) {
        // Assuming you want to search by name and surname
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { surname: { $regex: search, $options: 'i' } },
        ];
      }
  
      const contacts = await Contact.find(query)
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt);
  
      // Get total count for pagination
      const total = await Contact.countDocuments(query);
  
      res.send({
        contacts,
        totalPages: Math.ceil(total / limitInt),
        currentPage: pageInt,
      });
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

module.exports = router;
