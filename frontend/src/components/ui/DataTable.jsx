import React from 'react';

/**
 * DataTable component.
 *
 * @param {Array<{key: string, title: string, width?: string|number, render?: (value, row, index) => React.ReactNode}>} columns
 * @param {Array<Object>} data          - Array of row objects
 * @param {boolean} loading             - Show skeleton rows while data loads
 * @param {string} emptyText            - Text shown when data is empty and not loading
 * @param {Function} onRowClick         - Optional row click handler (row, index) => void
 * @param {number} skeletonRows         - Number of skeleton rows to show during loading (default 5)
 */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyText = 'Không có dữ liệu',
  onRowClick,
  skeletonRows = 5,
}) => {
  const hasClickHandler = typeof onRowClick === 'function';

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        {/* Header */}
        <thead>
          <tr style={styles.headerRow}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  ...styles.th,
                  width: col.width || undefined,
                  minWidth: col.width || undefined,
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Loading skeleton rows */}
          {loading &&
            Array.from({ length: skeletonRows }).map((_, rowIdx) => (
              <tr key={`skeleton-${rowIdx}`} style={styles.skeletonRow}>
                {columns.map((col) => (
                  <td key={col.key} style={styles.td}>
                    <div style={styles.skeletonCell} />
                  </td>
                ))}
              </tr>
            ))}

          {/* Empty state */}
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={styles.emptyCell}>
                <div style={styles.emptyContent}>
                  <span style={styles.emptyIcon}>📋</span>
                  <p style={styles.emptyText}>{emptyText}</p>
                </div>
              </td>
            </tr>
          )}

          {/* Data rows */}
          {!loading &&
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? row._id ?? rowIndex}
                style={{
                  ...styles.dataRow,
                  cursor: hasClickHandler ? 'pointer' : 'default',
                }}
                onClick={hasClickHandler ? () => onRowClick(row, rowIndex) : undefined}
                tabIndex={hasClickHandler ? 0 : undefined}
                onKeyDown={
                  hasClickHandler
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick(row, rowIndex);
                        }
                      }
                    : undefined
                }
              >
                {columns.map((col) => (
                  <td key={col.key} style={styles.td}>
                    {typeof col.render === 'function'
                      ? col.render(row[col.key], row, rowIndex)
                      : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Skeleton animation */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: '10px',
    border: '1px solid #e9ecef',
    backgroundColor: '#ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    color: '#212529',
  },
  headerRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    color: '#495057',
    whiteSpace: 'nowrap',
  },
  dataRow: {
    borderBottom: '1px solid #f1f3f5',
    transition: 'background-color 0.12s ease',
  },
  skeletonRow: {
    borderBottom: '1px solid #f1f3f5',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  skeletonCell: {
    height: '14px',
    borderRadius: '6px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '400px 100%',
    animation: 'shimmer 1.4s infinite linear',
    width: '70%',
  },
  emptyCell: {
    padding: '48px 16px',
    textAlign: 'center',
  },
  emptyContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  emptyIcon: {
    fontSize: '32px',
    opacity: 0.5,
  },
  emptyText: {
    margin: 0,
    color: '#adb5bd',
    fontSize: '14px',
  },
};

export default DataTable;
