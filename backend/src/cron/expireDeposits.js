const cron = require('node-cron');
const depositService = require('../services/depositService');

/**
 * Cron job: chạy mỗi giờ để kiểm tra và hủy các cọc quá hạn.
 * Lịch: * * * * * (vào phút 0 của mỗi phút)
 */
const startExpireDepositsCron = () => {
  cron.schedule('* * * * *', async () => {
    console.log(`[CRON] Đang kiểm tra cọc quá hạn lúc: ${new Date().toISOString()}`);
    try {
      const expiredCount = await depositService.expireOverdueDeposits();
      if (expiredCount > 0) {
        console.log(`[CRON] Đã hủy ${expiredCount} cọc quá hạn.`);
      } else {
        console.log(`[CRON] Không có cọc nào quá hạn.`);
      }
    } catch (err) {
      console.error('[CRON] Lỗi khi xử lý cọc quá hạn:', err.message);
    }
  });
  
  console.log('[CRON] Đã khởi tạo cron job hủy cọc quá hạn (chạy mỗi giờ).');
};

module.exports = { startExpireDepositsCron };