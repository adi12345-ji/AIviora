const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  weight: Number,
  height: Number,
  bloodPressure: String,
  bloodSugar: Number,
  symptoms: [String],
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  score: Number,
  suggestions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthData', healthDataSchema);
