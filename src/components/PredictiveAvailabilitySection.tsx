import CustomSimpleLineChart from './CustomSimpleLineChart';

const sample = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 4 },
  { name: 'Wed', value: 10 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 3 },
];

function PredictiveAvailabilitySection() {
  return (
    <>
      <h3 className="fw-semibold pb-2 sub-title">Predictive Availability</h3>
      <div className="border rounded-3 p-4">
        <h4 className="fw-semibold mb-1">Next 7 Days Forecast</h4>
        <p className="text-secondary mb-3">
          Projected room usage and availability trends.
        </p>
        <div style={{ height: '350px' }}>
          <CustomSimpleLineChart
            data={sample}
            colors={['#14948E']}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </>
  );
}

export default PredictiveAvailabilitySection;
