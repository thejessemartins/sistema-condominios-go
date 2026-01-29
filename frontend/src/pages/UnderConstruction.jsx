import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <i className="bi bi-cone-striped" style={{ fontSize: '100px', color: '#FFC107' }}></i>
        <h2 className="mt-4 text-secondary" style={{ fontSize: '2rem', fontWeight: 400 }}>Em construção</h2>
        <p className="text-muted fs-5">Esta página está sendo preparada para você.</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
