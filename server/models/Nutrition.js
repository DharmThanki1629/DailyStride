  const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:     { type: Date, default: Date.now },
  meal:     { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
  foodItem: { type: String, required: true },
  calories: { type: Number },
  protein:  { type: Number },
  carbs:    { type: Number },
  fat:      { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Nutrition', NutritionSchema);
