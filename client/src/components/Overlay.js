import React from 'react';

function LoadingOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div style={{ color: '#fff', fontSize: '24px' }}>Voting Transaction in progress, please don't reload...</div>
    </div>
  );
}

export default LoadingOverlay;
