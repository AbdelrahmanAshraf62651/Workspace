import React from 'react';
import { Card } from 'react-bootstrap';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { day: 'Mon', Bookings: 12 },
  { day: 'Tue', Bookings: 15 },
  { day: 'Wed', Bookings: 10 },
  { day: 'Thu', Bookings: 18 },
  { day: 'Fri', Bookings: 24 },
  { day: 'Sat', Bookings: 7 },
  { day: 'Sun', Bookings: 5 },
];

const DailyBooking = () => {
  return (
    <Card className="shadow border-0 rounded-3 h-100 chart-style">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          Daily Booking Trends
        </Card.Title>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20, 
                left: -20, 
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}  
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                ticks={[0, 6, 12, 18, 24]} 
              />
              <Tooltip />
              <Legend verticalAlign="bottom" />
              <Line
                type="monotone" 
                dataKey="Bookings"
                stroke="#000000"
                strokeWidth={2}
                dot={{ r: 5, fill: '#000000' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DailyBooking;