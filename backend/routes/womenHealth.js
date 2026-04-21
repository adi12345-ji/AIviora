const express = require('express');
const router = express.Router();
const WomenHealth = require('../models/WomenHealth');
const auth = require('../middleware/auth');

// @route   POST api/women-health/setup
// @desc    Initialize or update period tracking
router.post('/setup', auth, async (req, res) => {
  const { lastPeriodDate, cycleLength } = req.body;
  try {
    let health = await WomenHealth.findOne({ user: req.user.id });
    if (health) {
      health.lastPeriodDate = lastPeriodDate;
      health.cycleLength = cycleLength || health.cycleLength;
    } else {
      health = new WomenHealth({
        user: req.user.id,
        lastPeriodDate,
        cycleLength
      });
    }
    await health.save();
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/women-health/status
// @desc    Get tracking status and predictions
router.get('/status', auth, async (req, res) => {
  try {
    const health = await WomenHealth.findOne({ user: req.user.id });
    if (!health) return res.status(404).json({ msg: 'No tracking data found' });
    
    // Simple prediction logic
    const nextPeriod = new Date(health.lastPeriodDate);
    nextPeriod.setDate(nextPeriod.getDate() + health.cycleLength);
    
    res.json({
      health,
      nextPeriod,
      daysUntil: Math.ceil((nextPeriod - new Date()) / (1000 * 60 * 60 * 24))
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
