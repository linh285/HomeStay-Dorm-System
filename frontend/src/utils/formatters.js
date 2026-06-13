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
  AVAILABLE: { label: 'Còn trống', color: 'available' },
  PENDING: { label: 'Chờ cọc', color: 'warning' },
  RESERVED: { label: 'Đã cọc', color: 'info' },
  OCCUPIED: { label: 'Đang sử dụng', color: 'occupied' },
  MAINTENANCE: { label: 'Bảo trì', color: 'maintenance' },
  INACTIVE: { label: 'Ngưng sử dụng', color: 'secondary' },
};

// Deposit status
export const depositStatusConfig = {
  PENDING_APPROVAL: { label: 'Chờ kế toán xử lý', color: 'info' },
  PENDING_PAYMENT: { label: 'Chờ khách thanh toán', color: 'warning' },
  APPROVED: { label: 'Đã xác nhận cọc', color: 'available' },
  EXPIRED: { label: 'Quá hạn thanh toán', color: 'danger' },
  CANCELLED: { label: 'Đã hủy', color: 'secondary' },
  REJECTED: { label: 'Từ chối', color: 'danger' },
};

// Contract status
export const contractStatusConfig = {
  PENDING: { label: 'Chờ xử lý', color: 'warning' },
  PENDING_FIRST_PAYMENT: { label: 'Chờ thanh toán kỳ đầu', color: 'warning' },
  ACTIVE: { label: 'Đang hiệu lực', color: 'available' },
  EXPIRED: { label: 'Hết hạn', color: 'secondary' },
  TERMINATED: { label: 'Đã thanh lý', color: 'secondary' },
  CANCELLED: { label: 'Đã hủy', color: 'danger' },
};

// Checkout/return status
export const checkoutStatusConfig = {
  PENDING: { label: 'Chờ duyệt', color: 'warning' },
  INSPECTING: { label: 'Đang kiểm tra', color: 'info' },
  COMPLETED: { label: 'Đã hoàn tất', color: 'available' },
  CANCELLED: { label: 'Đã hủy', color: 'secondary' },
};

// Generate invoice number format
export const generateInvoiceNumber = (id) =>
  `HD-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`;
