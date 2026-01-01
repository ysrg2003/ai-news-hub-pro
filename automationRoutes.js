const express = require('express');
const router = express.Router();
const { runOnce, getStatus } = require('../services/automationController');

/**
 * POST /api/automation/run
 * Manually trigger the daily automation
 */
router.post('/run', async (req, res) => {
  try {
    const result = await runOnce();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/automation/status
 * Get current automation status
 */
router.get('/status', (req, res) => {
  try {
    const status = getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
