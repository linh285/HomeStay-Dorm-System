require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');
const { startExpireDepositsCron } = require('./src/cron/expireDeposits');
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synced');
    }
    
    // Chỉ khởi động cron job một lần
    startExpireDepositsCron();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();