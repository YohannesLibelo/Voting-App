import React from 'react';

const Modal = ({ manifestoText }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-6 fw-bold fs-5" id="exampleModalLabel">View Manifesto</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul className="molist">
              <li>{manifestoText}</li>
              {/* Add more list items as needed */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;