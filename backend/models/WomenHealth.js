const mongoose = require('mongoose');

const womenHealthSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastPeriodDate: { type: Date, required: true },
  cycleLength: { type: Number, default: 28 },
  symptoms: [{
    date: { type: Date, default: Date.now },
    type: { type: String }, // e.g., Cramps, Bloating
    severity: String // Low, Medium, High
  }],
  logs: [{
    date: { type: Date, default: Date.now },
    note: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WomenHealth', womenHealthSchema);
