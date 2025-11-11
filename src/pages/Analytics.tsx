import AnalyticsCard from '../components/AnalysisCard';
import CustomActiveShapePieChart from '../components/CustomActiveShapePieChart';
import CustomSimpleLineChart from '../components/CustomSimpleLineChart';

const overview = [
  {
    title: 'Total Bookings',
    body: '1520',
    unit: 'This month',
  },
  {
    title: 'Occupancy Rate',
    body: '78%',
    unit: 'Overall average',
  },
  {
    title: 'Peak Hours',
    body: '2-4 PM',
    unit: 'Highest demand period',
  },
  {
    title: 'Active Users',
    body: '345',
    unit: 'Currently logged in',
  },
];

const days = ['Time / Day', 'Sat.', 'Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.'];

const times = [
  '9-10 AM',
  '10-11 AM',
  '11-12 PM',
  '1-2 PM',
  '2-3 PM',
  '3-4 PM',
  '4-5 PM',
];

const nums = [
  [4, 1, 12, 2, 20, 7],
  [8, 12, 2, 2, 20, 7],
  [5, 4, 1, 2, 20, 7],
  [6, 6, 0, 2, 20, 7],
  [1, 7, 1, 2, 20, 7],
  [10, 2, 2, 2, 20, 7],
  [10, 2, 2, 2, 20, 7],
];

const sampleData = [
  { name: 'x', value: 400, color: '#FFab00' },
  { name: 'y', value: 300, color: '#000000' },
  { name: 'z', value: 200, color: '#8B0000' },
  { name: 'N', value: 100 },
];

const sample = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 400 },
  { name: 'Jul', value: 300 },
  { name: 'Aug', value: 500 },
  { name: 'Seb', value: 700 },
  { name: 'Oct', value: 600 },
  { name: 'Nov', value: 900 },
  { name: 'Dec', value: 100 },
];

function Analytics() {
  return (
    <main className="container pt-5">
      <h1 className="fw-bolder mb-4">Analytics Dashboard</h1>

      <div className="row g-4 mb-5">
        {overview.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3">
            <AnalyticsCard
              title={item.title}
              body={item.body}
              unit={item.unit}
            />
          </div>
        ))}
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12 col-lg-6">
          <div className="border rounded-3 p-4 h-100 d-flex flex-column">
            <h4 className="fw-semibold mb-1">Room Utilization</h4>
            <p className="text-secondary mb-3">By Room Type</p>
            <div
              style={{
                minHeight: '350px',
                width: '100%',
              }}
            >
              <CustomActiveShapePieChart data={sampleData} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="border rounded-3 p-4 h-100 d-flex flex-column">
            <h4 className="fw-semibold mb-1">Peak Usage Hours</h4>
            <p className="text-secondary mb-3">Average Usage (1-12 scale)</p>

            <div className="table-responsive flex-grow-1">
              <table className="table text-center align-middle mb-0">
                <thead className="table">
                  <tr>
                    {days.map((day, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="text-secondary fw-semibold"
                        style={index === 0 ? { minWidth: '100px' } : undefined}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nums.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <th scope="row" className="fw-medium text-secondary">
                        {times[rowIndex]}
                      </th>
                      {row.map((num, colIndex) => (
                        <td
                          key={colIndex}
                          className={num >= 10 ? 'fw-bold text-dark' : ''}
                        >
                          {num}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="border rounded-3 p-4">
            <h4 className="fw-semibold mb-1">Booking Trends</h4>
            <p className="text-secondary mb-3">Last 12 Months</p>
            <div style={{ height: '350px' }}>
              <CustomSimpleLineChart
                data={sample}
                colors={['#000000']}
                style={{ height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analytics;
