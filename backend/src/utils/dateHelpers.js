/**
 * Date utility helpers
 */

const addHours = (date, hours) => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const diffInMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('vi-VN');
};

module.exports = { addHours, addMonths, diffInMonths, formatDate };
