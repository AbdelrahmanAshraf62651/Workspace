import { Table } from 'react-bootstrap';
const activityData = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Booked Meeting Room A',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: 'Admin Sarah',
    action: 'Updated Room B schedule',
    time: 'Yesterday',
  },
  {
    id: 3,
    user: 'Jane Smith',
    action: 'Cancelled Focus Pod 2 booking',
    time: '2 days ago',
  },
  {
    id: 4,
    user: 'System',
    action: 'Completed maintenance on Room 103',
    time: '3 days ago',
  },
  {
    id: 5,
    user: 'Mike Brown',
    action: 'Registered as a new user',
    time: '4 days ago',
  },
];

const RecentActivity = () => {
  return (
    <div className="mt-4 border border-1 border-dark border-opacity-25 p-4 rounded-2">
      <div>
        <h3 className="mb-4">Recent Activity</h3>

        <Table
          responsive
          hover
          className="align-middle"
          style={{ minWidth: '700px' }}
        >
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th className="text-start">User</th>
              <th className="text-start">Action</th>
              <th className="text-center">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((activity) => (
              <tr key={activity.id}>
                <td className="text-start">{activity.user}</td>
                <td className="text-start">{activity.action}</td>
                <td className="text-center">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RecentActivity;
