import React from 'react';

/**
 * Badge component for displaying status labels.
 *
 * @param {React.ReactNode} children - Badge text content
 * @param {'available'|'pending'|'reserved'|'occupied'|'maintenance'|'danger'|'success'|'warning'|'secondary'|'info'|'default'} variant
 * @param {'sm'|'md'|'lg'} size
 */
const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    available: 'badge badge-available',
    pending: 'badge badge-warning',
    reserved: 'badge badge-info',
    occupied: 'badge badge-occupied',
    maintenance: 'badge badge-maintenance',
    danger: 'badge badge-danger',
    success: 'badge badge-available',
    warning: 'badge badge-warning',
    secondary: 'badge badge-secondary',
    info: 'badge badge-info',
    default: 'badge',
  };

  const sizeStyles = {
    sm: { fontSize: '10px', padding: '2px 6px' },
    md: { fontSize: '12px', padding: '3px 8px' },
    lg: { fontSize: '13px', padding: '4px 10px' },
  };

  const className = variants[variant] || variants.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <span className={className} style={sizeStyle}>
      {children}
    </span>
  );
};

export default Badge;
