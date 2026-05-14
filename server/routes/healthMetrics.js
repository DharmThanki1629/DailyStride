  const router = require('express').Router();
const auth = require('../middleware/auth');
const HealthMetric = require('../models/HealthMetric');

router.get('/', auth, async (req, res) => {
  const metrics = await HealthMetric.find({ user: req.user.id }).sort({ date: -1 });
  res.json(metrics);
});

router.post('/', auth, async (req, res) => {
  try {
    const metric = await HealthMetric.create({ ...req.body, user: req.user.id });
    res.status(201).json(metric);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const metric = await HealthMetric.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, req.body, { new: true }
    );
    res.json(metric);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await HealthMetric.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
