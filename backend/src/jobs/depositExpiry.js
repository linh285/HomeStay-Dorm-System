const cron = require('node-cron');

let job;

const start = () => {
  // Run every hour at minute 0
  job = cron.schedule('0 * * * *', async () => {
    try {
      console.log('[CRON] Checking for expired deposits...');
      const depositService = require('../services/depositService');
      const count = await depositService.expireOverdueDeposits();
      if (count > 0) {
        console.log(`[CRON] Expired ${count} overdue deposits`);
      }
    } catch (error) {
      console.error('[CRON] Error expiring deposits:', error.message);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Ho_Chi_Minh',
  });

  console.log('[CRON] Deposit expiry job scheduled (every hour)');
};

const stop = () => {
  if (job) job.stop();
};

module.exports = { start, stop };
