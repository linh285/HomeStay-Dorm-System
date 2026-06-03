import React from 'react';
import { FiCheck } from 'react-icons/fi';

/**
 * Stepper component for multi-step wizard flows.
 *
 * @param {Array<{title: string, description?: string}>} steps - List of step definitions
 * @param {number} currentStep - Zero-based index of the active step
 */
const Stepper = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="stepper" style={styles.stepper}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className={`stepper-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
            style={styles.step}
          >
            {/* Circle + connector line */}
            <div style={styles.circleWrapper}>
              <div
                className="stepper-circle"
                style={{
                  ...styles.circle,
                  backgroundColor: isCompleted
                    ? '#198754'
                    : isActive
                    ? '#0A58CA'
                    : '#dee2e6',
                  color: isCompleted || isActive ? '#ffffff' : '#6c757d',
                  border: isActive ? '2px solid #0A58CA' : '2px solid transparent',
                }}
              >
                {isCompleted ? <FiCheck size={14} /> : index + 1}
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div
                  className="stepper-line"
                  style={{
                    ...styles.line,
                    backgroundColor: isCompleted ? '#198754' : '#dee2e6',
                  }}
                />
              )}
            </div>

            {/* Step content */}
            <div className="stepper-content" style={styles.content}>
              <div
                className="stepper-title"
                style={{
                  ...styles.stepTitle,
                  color: isActive
                    ? '#0A58CA'
                    : isCompleted
                    ? '#198754'
                    : '#6c757d',
                  fontWeight: isActive ? '600' : '500',
                }}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="stepper-desc" style={styles.stepDesc}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  stepper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 0,
    padding: '8px 0',
    overflowX: 'auto',
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    minWidth: '80px',
  },
  circleWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '600',
    flexShrink: 0,
    zIndex: 1,
    transition: 'background-color 0.2s ease',
    boxSizing: 'border-box',
  },
  line: {
    position: 'absolute',
    left: '50%',
    right: '-50%',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '2px',
    zIndex: 0,
    transition: 'background-color 0.2s ease',
  },
  content: {
    marginTop: '8px',
    textAlign: 'center',
    padding: '0 4px',
  },
  stepTitle: {
    fontSize: '13px',
    lineHeight: 1.3,
    marginBottom: '2px',
  },
  stepDesc: {
    fontSize: '11px',
    color: '#adb5bd',
    lineHeight: 1.4,
  },
};

export default Stepper;
