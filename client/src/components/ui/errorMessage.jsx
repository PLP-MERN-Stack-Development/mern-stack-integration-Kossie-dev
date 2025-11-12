import React from 'react';

const ErrorMessage = ({ message, onRetry, onDismiss }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Oops! Something went wrong</h3>
        <p>{message}</p>
        <div className="error-actions">
          {onRetry && (
            <button onClick={onRetry} className="btn btn-primary btn-sm">
              Try Again
            </button>
          )}
          {onDismiss && (
            <button onClick={onDismiss} className="btn btn-secondary btn-sm">
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;