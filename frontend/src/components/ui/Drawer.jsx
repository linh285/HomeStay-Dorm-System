import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Drawer (slide-in panel) component.
 *
 * @param {boolean} isOpen         - Controls visibility
 * @param {Function} onClose       - Called when overlay or close button clicked
 * @param {string} title           - Drawer header title
 * @param {React.ReactNode} children  - Drawer body content
 * @param {React.ReactNode} footer    - Optional footer content
 * @param {string} width           - CSS width string (default '450px')
 */
const Drawer = ({ isOpen, onClose, title, children, footer, width = '450px' }) => {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
          style={styles.overlay}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`drawer ${isOpen ? 'drawer-open' : ''}`}
        style={{
          ...styles.drawer,
          width,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="drawer-header" style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button
            className="drawer-close"
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Đóng"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body" style={styles.body}>
          {children}
        </div>

        {/* Footer (optional) */}
        {footer && (
          <div className="drawer-footer" style={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 998,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #e9ecef',
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: '17px',
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#6c757d',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
  },
  body: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
  },
  footer: {
    padding: '16px 24px',
    borderTop: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    flexShrink: 0,
  },
};

export default Drawer;
