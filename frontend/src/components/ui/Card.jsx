import React from 'react';

/**
 * Card container component.
 *
 * @param {React.ReactNode} children  - Card body content
 * @param {string} title              - Optional card header title
 * @param {React.ReactNode} extra     - Optional element rendered in the header right side (e.g. action buttons)
 * @param {string} className          - Additional CSS class names
 * @param {string} padding            - Inline padding override (default '20px')
 */
const Card = ({ children, title, extra, className = '', padding = '20px' }) => (
  <div
    className={`card ${className}`}
    style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}
  >
    {(title || extra) && (
      <div
        className="card-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `16px ${padding}`,
          borderBottom: '1px solid #f1f3f5',
          gap: '12px',
        }}
      >
        {title && (
          <h3
            className="card-title"
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#212529',
              flex: 1,
            }}
          >
            {title}
          </h3>
        )}
        {extra && (
          <div className="card-extra" style={{ flexShrink: 0 }}>
            {extra}
          </div>
        )}
      </div>
    )}

    <div style={{ padding }}>
      {children}
    </div>
  </div>
);

export default Card;
