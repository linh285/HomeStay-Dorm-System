require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');
const depositExpiryJob = require('./src/jobs/depositExpiry');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync models (alter in dev, do nothing in prod)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synced');
    }
    
    // Start cron jobs
    depositExpiryJob.start();
    console.log('✅ Cron jobs started');
    
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
