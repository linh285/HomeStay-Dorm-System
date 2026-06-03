import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Modal dialog component.
 *
 * @param {boolean} isOpen       - Controls visibility
 * @param {Function} onClose     - Called when backdrop or close button is clicked
 * @param {string} title         - Modal header title
 * @param {React.ReactNode} children  - Modal body content
 * @param {React.ReactNode} footer    - Optional footer content (e.g. action buttons)
 * @param {'sm'|'md'|'lg'|'xl'} size - Controls max-width of the modal
 */
const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: '400px',
    md: '500px',
    lg: '700px',
    xl: '900px',
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={styles.overlay}>
      <div
        className="modal"
        style={{ ...styles.modal, maxWidth: sizeMap[size] || sizeMap.md }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={styles.header}>
          <h3 className="modal-title" style={styles.title}>{title}</h3>
          <button
            className="modal-close"
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Đóng"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={styles.body}>
          {children}
        </div>

        {/* Footer (optional) */}
        {footer && (
          <div className="modal-footer" style={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'modalFadeIn 0.2s ease',
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

export default Modal;
