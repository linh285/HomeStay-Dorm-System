import React from 'react';
import { FiLoader } from 'react-icons/fi';

/**
 * Button component.
 *
 * @param {'primary'|'outline'|'secondary'|'danger'|'text-link'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading - Shows a spinning loader and disables the button
 * @param {boolean} disabled
 * @param {boolean} fullWidth - Makes button 100% wide
 * @param {Function} onClick
 * @param {'button'|'submit'|'reset'} type
 * @param {React.ReactNode} children
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  style: externalStyle = {},
  ...rest
}) => {
  const isDisabled = disabled || loading;

  // Base styles shared by all variants
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease, opacity 0.15s ease, border-color 0.15s ease',
    opacity: isDisabled ? 0.65 : 1,
    width: fullWidth ? '100%' : undefined,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  // Size styles
  const sizes = {
    sm: { fontSize: '12px', padding: '6px 12px', minHeight: '30px' },
    md: { fontSize: '14px', padding: '9px 18px', minHeight: '38px' },
    lg: { fontSize: '15px', padding: '12px 24px', minHeight: '44px' },
  };

  // Variant styles
  const variants = {
    primary: {
      backgroundColor: '#0A58CA',
      color: '#ffffff',
      border: '1px solid #0A58CA',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#0A58CA',
      border: '1px solid #0A58CA',
    },
    secondary: {
      backgroundColor: '#f1f3f5',
      color: '#495057',
      border: '1px solid #dee2e6',
    },
    danger: {
      backgroundColor: '#dc3545',
      color: '#ffffff',
      border: '1px solid #dc3545',
    },
    'text-link': {
      backgroundColor: 'transparent',
      color: '#0A58CA',
      border: '1px solid transparent',
      padding: 0,
    },
  };

  const combinedStyle = {
    ...base,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary),
    ...externalStyle,
  };

  return (
    <button
      type={type}
      style={combinedStyle}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <FiLoader
          size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15}
          style={{ animation: 'spin 1s linear infinite' }}
        />
      )}
      {children}

      {/* Inline keyframes for spinner — injected once */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;
