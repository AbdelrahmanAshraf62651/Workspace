import CustomSimpleLineChart from './CustomSimpleLineChart';
const data = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 15 },
  { name: 'Wed', value: 10 },
  { name: 'Thu', value: 18 },
  { name: 'Fri', value: 24 },
  { name: 'Sat', value: 7 },
  { name: 'Sun', value: 5 },
];

const DailyBooking = () => {
  return (
    <div className="border border-1 border-dark border-opacity-25 p-4 rounded-2 h-100 d-flex flex-column">
      <h3 className="mb-4">Daily Booking Trends</h3>
      <div className="flex-grow-1" style={{ minHeight: '200px' }}>
        <CustomSimpleLineChart data={data} colors={['#000000']} />
      </div>
    </div>
  );
};

export default DailyBooking;
