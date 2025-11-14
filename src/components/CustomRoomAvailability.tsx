function CustomRoomAvailability() {
  return (
    <div className="border mt-4 border-1 border-dark border-opacity-25 p-4 rounded-2">
      <h3 className="fw-bolder">Set Custom Room Availability</h3>
      <p className="mb-4 text-secondary">
        Define specific booking periods or block rooms for maintenance and
        events.
      </p>
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="position-relative">
            <label>Select Room</label>
            <select className="form-select mt-2">
              <option value="">Room Type</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <label>Start Date</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Pick a date range"
              onFocus={(e) => (e.target.type = 'date')}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <label>End Date</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Pick a date range"
              onFocus={(e) => (e.target.type = 'date')}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <label>Start Time</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Pick a date range"
              onFocus={(e) => (e.target.type = 'time')}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="position-relative">
            <label>End Time</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Pick a date range"
              onFocus={(e) => (e.target.type = 'time')}
            />
          </div>
        </div>
        <div className="col-12 d-flex gap-2 d-flex justify-content-end">
          <button className="btn sec-btn">Save Schedule</button>
          <button className="btn main-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CustomRoomAvailability;
