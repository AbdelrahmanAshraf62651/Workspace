import React from 'react';
import { Card, Table } from 'react-bootstrap';
const activityData = [
  { id: 1, user: 'John Doe', action: 'Booked Meeting Room A', time: '2 hours ago' },
  { id: 2, user: 'Admin Sarah', action: 'Updated Room B schedule', time: 'Yesterday' },
  { id: 3, user: 'Jane Smith', action: 'Cancelled Focus Pod 2 booking', time: '2 days ago' },
  { id: 4, user: 'System', action: 'Completed maintenance on Room 103', time: '3 days ago' },
  { id: 5, user: 'Mike Brown', action: 'Registered as a new user', time: '4 days ago' },
];

const RecentActivity = () => {
  return (
    <Card className="shadow border-0 rounded-3">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          Recent Activity
        </Card.Title>
        
        <Table responsive hover className="align-middle">
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th className="text-end">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.user}</td>
                <td>{activity.action}</td>
                <td className="text-end text-muted">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RecentActivity;