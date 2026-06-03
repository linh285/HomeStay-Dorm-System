import React from 'react';

/**
 * Input component — wraps label + input/select/textarea.
 *
 * @param {string} label        - Label text above the field
 * @param {string} error        - Error message (renders red text below)
 * @param {React.ReactNode} icon - Icon rendered on the left inside the input
 * @param {'text'|'email'|'tel'|'number'|'date'|'time'|'select'|'textarea'} type
 * @param {Array<{value, label}>} options - Required when type === 'select'
 * @param {number} rows         - Rows for textarea (default 3)
 * @param {string} placeholder
 * @param {boolean} required
 * @param {boolean} disabled
 * @param {boolean} readOnly
 * @param {string|number} value
 * @param {Function} onChange
 * @param {string} name
 * @param {string} id
 */
const Input = ({
  label,
  error,
  icon,
  type = 'text',
  options = [],
  rows = 3,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  value,
  onChange,
  name,
  id,
  style: externalStyle = {},
  className = '',
  ...rest
}) => {
  const inputId = id || name || (label ? label.replace(/\s+/g, '_').toLowerCase() : undefined);

  const baseInputStyle = {
    width: '100%',
    height: type === 'textarea' ? undefined : '38px',
    border: `1px solid ${error ? '#dc3545' : '#dee2e6'}`,
    borderRadius: '8px',
    padding: icon ? '0 12px 0 38px' : '0 12px',
    fontSize: '14px',
    color: '#212529',
    backgroundColor: disabled || readOnly ? '#f8f9fa' : '#ffffff',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  const textareaStyle = {
    ...baseInputStyle,
    height: undefined,
    padding: icon ? '8px 12px 8px 38px' : '8px 12px',
    resize: 'vertical',
    lineHeight: '1.5',
  };

  const renderField = () => {
    if (type === 'select') {
      return (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={{ ...baseInputStyle, paddingRight: '32px', cursor: disabled ? 'not-allowed' : 'pointer' }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          rows={rows}
          style={textareaStyle}
          {...rest}
        />
      );
    }

    return (
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        style={baseInputStyle}
        {...rest}
      />
    );
  };

  return (
    <div style={{ ...styles.wrapper, ...externalStyle }} className={className}>
      {label && (
        <label htmlFor={inputId} style={styles.label}>
          {label}
          {required && <span style={styles.required}> *</span>}
        </label>
      )}

      <div style={styles.fieldWrapper}>
        {/* Left icon */}
        {icon && (
          <span style={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        {renderField()}

        {/* Select chevron */}
        {type === 'select' && (
          <span style={styles.selectChevron} aria-hidden="true">
            ▾
          </span>
        )}
      </div>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#495057',
    userSelect: 'none',
  },
  required: {
    color: '#dc3545',
  },
  fieldWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#adb5bd',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    zIndex: 1,
  },
  selectChevron: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#adb5bd',
    pointerEvents: 'none',
    fontSize: '12px',
  },
  error: {
    margin: 0,
    fontSize: '12px',
    color: '#dc3545',
    lineHeight: 1.4,
  },
};

export default Input;
