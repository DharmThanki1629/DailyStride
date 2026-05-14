const mongoose = require('mongoose');

const HealthMetricSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:       { type: Date, default: Date.now },
  weight:     { type: Number },
  steps:      { type: Number },
  heartRate:  { type: Number },
  sleepHours: { type: Number },
  water:      { type: Number },
  calories:   { type: Number },
  notes:      { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HealthMetric', HealthMetricSchema);