// Format currency in VND
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '—';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Format date to dd/MM/yyyy
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Format datetime
export const formatDateTime = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Room status labels and colors
export const roomStatusConfig = {
  AVAILABLE: { label: 'Còn trống', color: 'badge-available' },
  PENDING: { label: 'Chờ cọc', color: 'badge-warning' },
  RESERVED: { label: 'Đã cọc', color: 'badge-info' },
  OCCUPIED: { label: 'Đang sử dụng', color: 'badge-occupied' },
  MAINTENANCE: { label: 'Bảo trì', color: 'badge-maintenance' },
  INACTIVE: { label: 'Ngưng sử dụng', color: 'badge-secondary' },
};

// Deposit status
export const depositStatusConfig = {
  PENDING_PAYMENT: { label: 'Chờ thanh toán', color: 'badge-warning' },
  PENDING_APPROVAL: { label: 'Chờ duyệt', color: 'badge-warning' },
  APPROVED: { label: 'Đã thanh toán', color: 'badge-available' },
  EXPIRED: { label: 'Quá hạn', color: 'badge-danger' },
  CANCELLED: { label: 'Đã hủy', color: 'badge-secondary' },
  REJECTED: { label: 'Từ chối', color: 'badge-danger' },
};

// Contract status
export const contractStatusConfig = {
  PENDING: { label: 'Chờ xử lý', color: 'badge-warning' },
  PENDING_FIRST_PAYMENT: { label: 'Chờ thanh toán kỳ đầu', color: 'badge-warning' },
  ACTIVE: { label: 'Đang hiệu lực', color: 'badge-available' },
  EXPIRED: { label: 'Hết hạn', color: 'badge-secondary' },
  TERMINATED: { label: 'Đã thanh lý', color: 'badge-secondary' },
  CANCELLED: { label: 'Đã hủy', color: 'badge-danger' },
};

// Checkout/return status
export const checkoutStatusConfig = {
  PENDING: { label: 'Chờ duyệt', color: 'badge-warning' },
  INSPECTING: { label: 'Đang kiểm tra', color: 'badge-info' },
  COMPLETED: { label: 'Đã hoàn tất', color: 'badge-available' },
  CANCELLED: { label: 'Đã hủy', color: 'badge-secondary' },
};

// Generate invoice number format
export const generateInvoiceNumber = (id) =>
  `HD-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`;
