import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../styles.css';

interface HomeCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
  link: string;
  btn: string;
}

function HomeCard({ title, description, icon, link, btn }: HomeCardProps) {
  return (
    <div className="box col-12 col-md-6 col-lg-3">
      <div className="card shadow-sm pt-5 h-100 text-center">
        <div className="icon-container mx-auto">
          <FontAwesomeIcon icon={icon} size="3x" />
        </div>
        <div className="card-body pb-1 d-flex flex-column">
          <h4 className="item-name fw-bold">{title}</h4>
          <p className="card-text text-black-50 mb-2">{description}</p>
          <Link
            to={link}
            className="mb-3 mt-0 mt-auto text-decoration-none rounded sec-btn"
          >
            {btn}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
