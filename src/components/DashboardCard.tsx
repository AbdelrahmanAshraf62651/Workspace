import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconDefinition;
}

function DashboardCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="border border-1 border-dark border-opacity-25 p-3 rounded-2 d-flex flex-column justify-content-between h-100">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="me-2">{title}</h4>
        <FontAwesomeIcon icon={icon} style={{ height: '20px' }} />
      </div>
      <span className="fs-2 fw-semibold">{value}</span>
    </div>
  );
}

export default DashboardCard;