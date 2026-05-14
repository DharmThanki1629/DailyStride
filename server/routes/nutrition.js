  const router = require('express').Router();
const auth = require('../middleware/auth');
const Nutrition = require('../models/Nutrition');

router.get('/', auth, async (req, res) => {
  const logs = await Nutrition.find({ user: req.user.id }).sort({ date: -1 });
  res.json(logs);
});

router.post('/', auth, async (req, res) => {
  try {
    const log = await Nutrition.create({ ...req.body, user: req.user.id });
    res.status(201).json(log);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const log = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, req.body, { new: true }
    );
    res.json(log);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await Nutrition.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
