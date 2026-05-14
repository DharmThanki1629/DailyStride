  const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:     { type: Date, default: Date.now },
  type:     { type: String, required: true },
  duration: { type: Number },
  calories: { type: Number },
  notes:    { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
