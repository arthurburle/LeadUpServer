const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Card = mongoose.model('Card');

const router = express.Router();

router.use(requireAuth);

router.get('/cards', async (req, res) => {
  const cards = await Card.find({ userId: req.user._id });

  res.send(cards);
});

router.post('/cards', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(422)
      .send({ error: 'You must provide a title and a description' });
  }
  try {
    const card = new Card({ title, description, userId: req.user._id });
    await card.save();
    res.send(card);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
