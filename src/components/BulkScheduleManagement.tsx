import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

function BulkScheduleManagement() {
  const data = [
    {
      id: 1,
      roomName: 'Boardroom A',
      type: 'Meeting Room',
      availabilityStatus: 'Available',
      dateRange: 'Mon, 03 Jun - Fri, 07 Jun',
      assignedTo: 'Team Alpha',
    },
    {
      id: 2,
      roomName: 'Focus Pod 3',
      type: 'Focus Pod',
      availabilityStatus: 'Blocked',
      dateRange: 'Tue, 04 Jun (All Day)',
      assignedTo: 'Maintenance',
    },
    {
      id: 3,
      roomName: 'Conference Hall',
      type: 'Event Space',
      availabilityStatus: 'Partially Booked',
      dateRange: 'Sat, 08 Jun - Sun, 09 Jun',
      assignedTo: 'Company Event',
    },
    {
      id: 4,
      roomName: 'Meeting Room B',
      type: 'Meeting Room',
      availabilityStatus: 'Available',
      dateRange: 'Mon, 10 Jun - Wed, 12 Jun',
      assignedTo: 'Project Team',
    },
    {
      id: 5,
      roomName: 'Creative Hub',
      type: 'Collaboration Space',
      availabilityStatus: 'Blocked',
      dateRange: 'Fri, 14 Jun (All Day)',
      assignedTo: 'Staff Training',
    },
    {
      id: 6,
      roomName: 'Boardroom C',
      type: 'Meeting Room',
      availabilityStatus: 'Available',
      dateRange: 'Mon, 17 Jun - Fri, 21 Jun',
      assignedTo: 'Client Meeting',
    },
  ];
  return (
    <div className="border mt-4 border-1 border-dark border-opacity-25 p-4 rounded-2">
      <h3 className="fw-bolder">Bulk Schedule Management</h3>
      <p className="mb-4 text-secondary">
        Manage multiple room schedules, block periods, and apply bulk updates.
      </p>
      <div className="table-responsive">
        <table
          className="table table-striped align-middle"
          style={{ minWidth: '1000px' }}
        >
          <thead>
            <tr>
              <th scope="col" className="fw-semibold">
                <input
                  type="checkbox"
                  style={{ width: '1.1rem', height: '1.1rem' }}
                />
              </th>
              <th scope="col" className="fw-semibold">
                Room Name
              </th>
              <th scope="col" className="fw-semibold">
                Type
              </th>
              <th scope="col" className="fw-semibold">
                Availability Status
              </th>
              <th scope="col" className="fw-semibold">
                Date Range
              </th>
              <th scope="col" className="fw-semibold">
                Assigned To
              </th>
              <th scope="col" className="fw-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((event, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: '1.1rem', height: '1.1rem' }}
                  />
                </td>
                <td>{event.roomName}</td>
                <td>{event.type}</td>
                <td>{event.availabilityStatus}</td>
                <td>{event.dateRange}</td>
                <td>{event.assignedTo}</td>
                <td className='text-center'>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="btn">
                      <FontAwesomeIcon className="text-danger" icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-12 d-flex gap-2 pb-2 d-flex justify-content-start">
          <button className="btn btn-danger">Delete Selected</button>
          <button className="btn btn-black">Apply Template</button>
        </div>
      </div>
    </div>
  );
}

export default BulkScheduleManagement;
