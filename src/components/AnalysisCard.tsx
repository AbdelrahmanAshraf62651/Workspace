interface AnalyticsCardProps {
  title: string;
  body: string;
  unit: string;
}

function AnalyticsCard({ title, body, unit }: AnalyticsCardProps) {
  return (
    <div
    style={(unit === 'Past') ? {backgroundColor: '#EEEEF0'} : {}}
      className={`d-flex flex-column justify-content-center align-items-center p-3 border rounded-3`}
    >
      <p className="text-secondary">{title}</p>
      <h1 className={unit === 'Past' ? 'text-secondary' : 'text-bold'}>{body}</h1>
      <p className="text-secondary">{unit}</p>
    </div>
  );
}

export default AnalyticsCard;
