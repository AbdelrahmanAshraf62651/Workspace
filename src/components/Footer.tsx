import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="d-flex justify-content-between align-items-center pt-5 pb-4 container">
      <div className="ms-0 ms-lg-5">
        <a className="me-2" href="#">
          Navigate
        </a>
        <a href="#">Contact</a>
      </div>
      <div className="icons me-0 me-lg-5">
        <a href="#" target="_blank">
          <FontAwesomeIcon className="fs-5 me-2" icon={faLinkedinIn} />
        </a>
        <a href="#" target="_blank">
          <FontAwesomeIcon className="fs-5 me-2" icon={faGithub} />
        </a>
        <a href="#" target="_blank">
          <FontAwesomeIcon className="fs-5 me-2" icon={faFacebookF} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
