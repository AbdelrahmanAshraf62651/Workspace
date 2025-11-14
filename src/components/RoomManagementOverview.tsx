import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function RoomManagementOverview() {
  return (
    <div className="border border-1 border-dark border-opacity-25 p-4 rounded-2">
      <h3 className="fw-bolder">Room Management Overview</h3>
      <p className="mb-4 text-secondary">
        Quick access to room search, filtering, and essential actions.
      </p>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="position-relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search history..."
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-2">
          <div className="position-relative">
            <select className="form-select pe-4">
              <option value="">Room Type</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="position-relative">
            <select className="form-select pe-4">
              <option value="">Availability</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex gap-2 d-flex justify-content-center">
          <button className="btn sec-btn">Add New Room</button>
          <button className="btn main-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );
}

export default RoomManagementOverview;
