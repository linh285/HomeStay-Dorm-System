require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, NhanVien } = require('./src/models');

async function fixPasswords() {
  await sequelize.authenticate();
  const hash = await bcrypt.hash('123456', 10);
  console.log('Generated hash:', hash);
  const [updated] = await sequelize.query(
    `UPDATE "NHAN_VIEN" SET "MatKhau" = '${hash}'`,
    { type: sequelize.QueryTypes.UPDATE }
  );
  console.log('Updated users:', updated);
  
  // Verify
  const nv = await NhanVien.findOne({ where: { Email: 'admin@homestay.com' } });
  const ok = await bcrypt.compare('123456', nv.MatKhau);
  console.log('Password check admin:', ok);
  
  await sequelize.close();
}

fixPasswords().catch(console.error);
