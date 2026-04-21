const express = require('express');
const router = express.Router();
const HealthData = require('../models/HealthData');
const auth = require('../middleware/auth');

// @route   POST api/health/risk
// @desc    Calculate and save health risk
router.post('/risk', auth, async (req, res) => {
  const { age, weight, height, bloodPressure, bloodSugar, symptoms } = req.body;
  
  try {
    // Simplified Risk Calculation Logic
    let score = 50; // Base score
    
    if (age > 50) score += 10;
    if (bloodSugar > 140) score += 15;
    if (symptoms && symptoms.length > 2) score += 15;
    
    let riskLevel = 'Low';
    if (score > 75) riskLevel = 'High';
    else if (score > 60) riskLevel = 'Medium';
    
    const suggestions = [];
    if (riskLevel === 'High') suggestions.push('Consult a doctor immediately', 'Monitor blood pressure daily');
    else if (riskLevel === 'Medium') suggestions.push('Improve diet', 'Increase physical activity');
    else suggestions.push('Maintain healthy lifestyle', 'Regular checkups recommended');

    const newHealthData = new HealthData({
      user: req.user.id,
      age, weight, height, bloodPressure, bloodSugar, symptoms,
      riskLevel, score, suggestions
    });

    const data = await newHealthData.save();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/health/history
// @desc    Get all health records for user
router.get('/history', auth, async (req, res) => {
  try {
    const records = await HealthData.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
