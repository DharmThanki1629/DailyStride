 const router = require('express').Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

router.get('/', auth, async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
  res.json(workouts);
});

router.post('/', auth, async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, user: req.user.id });
    res.status(201).json(workout);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, req.body, { new: true }
    );
    res.json(workout);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
