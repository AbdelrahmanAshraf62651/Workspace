import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '/images/logo.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface AboutInfo {
  contact_phone: string;
  contact_email: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}

function Footer() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);

  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/location/1')
      .then((response) => {
        setAboutInfo(response.data);
      })
      .catch((error) => console.error('Error fetching footer info:', error));
  }, []);

  return (
    <footer className="footer mt-5 py-4 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="Logo" style={{ maxHeight: '30px' }} />
            </div>
            <p className="w-75">
              The best place to find comfort and productivity. We offer a unique
              blend of a cafe and a productive workspace.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5>Navigate</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li>
                <Link to="/cafe">Cafe</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex gap-2 align-items-center mb-2">
                <FontAwesomeIcon icon={faEnvelope} />
                {aboutInfo?.contact_email || 'Loading...'}
              </li>

              <li className="d-flex gap-2 align-items-center">
                <FontAwesomeIcon icon={faPhone} />
                {aboutInfo?.contact_phone || 'Loading...'}
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5>Follow Us</h5>

            <div className="social-icons d-flex">
              {aboutInfo?.linkedin && (
                <a
                  href={aboutInfo.linkedin}
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              )}

              {aboutInfo?.twitter && (
                <a
                  href={aboutInfo.twitter}
                  target="_blank"
                  aria-label="Twitter (X)"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              )}

              {aboutInfo?.facebook && (
                <a
                  href={aboutInfo.facebook}
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} SpaceX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
