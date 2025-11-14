import AnalyticsCard from './AnalysisCard';

const data = [
  { title: 'Total Rooms', body: '20', unit: 'Overall workspace capacity' },
  { title: 'Occupied Rooms', body: '12', unit: 'Currently in use by members' },
  { title: 'Available Rooms', body: '8', unit: 'Ready for immediate booking' },
  {
    title: 'Under Maintenance',
    body: '2',
    unit: 'Scheduled for repair or cleaning',
  },
];

function RoomStatusSection() {
  return (
    <>
      <h2 className="fw-semibold pb-2 sub-title">Current Room Status</h2>
      <div className="row g-4 mb-5">
        {data.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <AnalyticsCard
              title={item.title}
              body={item.body}
              unit={item.unit}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default RoomStatusSection;
