import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faLocationDot,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import img from '/images/about/image.png';
import { useAbout } from '../contexts/AboutContext';

// Helper function to convert 24-hour time to 12-hour format
const formatTime = (time24: string): string => {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

function About() {
  const { settings } = useAbout();
  return (
    <main className="container pt-5 about-page">
      <div className="hero-section d-flex flex-column flex-lg-row align-items-center justify-content-between p-3 p-lg-4 rounded gap-5 gap-lg-3">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-between align-items-start gap-3">
          <p className="fs-1 fw-bold ">Your Ideal Workspace Await</p>
          <p className="fs-5 ">
            Workspace Manager offers modern, flexible office solutions designed
            to foster productivity and community. From private offices to
            collaborative co-working spaces, we provide an environment where
            your ideas can thrive.
          </p>
          <button className="sec-btn btn-lg rounded-1">Discover More</button>
        </div>
        <div className="col-12 col-lg-6 pe-lg-3">
          <img src={img} alt="landscape" className="img-fluid rounded-2" />
        </div>
      </div>
      <div className="loaction-map mt-3 p-3 p-lg-4 rounded border g-4">
        <p className="fs-2 fw-bold">Our Location</p>
        <iframe
          className="col-12"
          src={settings.location.mapLink}
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="about-info py-3 rounded g-4">
        <div className="row g-3">
          <div className="col-12 col-lg-6 d-flex">
            <div className="p-3 border rounded-1 h-100 d-flex flex-column justify-content-between w-100 shadow-sm">
              <div>
                <p className="fs-3 fw-bold pb-2">Contact Details</p>
                <div className="d-flex gap-2 align-items-start mb-2">
                  <FontAwesomeIcon className="mt-1" icon={faLocationDot} />
                  <div>{settings.location.address}</div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <FontAwesomeIcon icon={faPhone} />
                  <div>{settings.contact.phone}</div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div>{settings.contact.email}</div>
                </div>
              </div>
              <div>
                <hr />
                <div className="d-flex gap-3">
                  <a href="#" target="_blank" aria-label="Facebook">
                    <FontAwesomeIcon className="fs-4 me-2" icon={faFacebookF} />
                  </a>
                  <a href="#" target="_blank" aria-label="Twitter">
                    <FontAwesomeIcon className="fs-4 me-2" icon={faXTwitter} />
                  </a>
                  <a href="#" target="_blank" aria-label="LinkedIn">
                    <FontAwesomeIcon
                      className="fs-4 me-2"
                      icon={faLinkedinIn}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex">
            <div className="p-3 border rounded-1 h-100 d-flex flex-column justify-content-between w-100 shadow-sm">
              <div>
                <p className="fs-3 fw-bold pb-2">Opening Hours</p>
                {Object.entries(settings.openingHours).map(([day, schedule]) => {
                  const dayLabels: { [key: string]: string } = {
                    monday: 'Monday',
                    tuesday: 'Tuesday',
                    wednesday: 'Wednesday',
                    thursday: 'Thursday',
                    friday: 'Friday',
                    saturday: 'Saturday',
                    sunday: 'Sunday',
                  };
                  const dayLabel = dayLabels[day] || day;
                  
                  return schedule.isOpen ? (
                    <div key={day} className="d-flex gap-2 align-items-center mb-2">
                      <FontAwesomeIcon icon={faClock} />
                      <div>
                        {dayLabel}:{' '}
                        <span className="ms-2">
                          {formatTime(schedule.openTime)} - {formatTime(schedule.closeTime)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={day} className="d-flex gap-2 align-items-center mb-2">
                      <FontAwesomeIcon icon={faClock} />
                      <div>
                        {dayLabel}: <span className="ms-2">Closed</span>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex gap-2 align-items-center">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    Holidays: <span className="ms-2">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-4">
          <div className="p-3 border rounded-1 shadow-sm">
            <p className="fs-3 fw-bold pb-2">Send Us a Message</p>
            <form className="col-12" action="/submit" method="POST">
              <div className="mb-3">
                <label className="fs-6 py-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  className="form-control px-3 py-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="fs-6 py-2">Your Email</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  id="email"
                  className="form-control px-3 py-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="fs-6 py-2">Subject</label>
                <input
                  type="text"
                  placeholder="Inquiry about booking"
                  id="subject"
                  className="form-control px-3 py-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="fs-6 py-2">Your Message</label>
                <textarea
                  placeholder="Your message"
                  id="message"
                  className="form-control px-3 py-2"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="sec-btn fs-5 btn-lg rounded-1 col-12 mt-3"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="ceo-message d-flex flex-column align-items-center justify-content-center p-3 p-lg-5 rounded">
        <h3 className="text-center fst-italic">
          "Workspace Manager has transformed how our team collaborates. The
          flexible spaces and vibrant community make it an inspiring place to
          work."
        </h3>
        <h5>Jane Doe, CEO of Innovate Solution</h5>
      </div>
    </main>
  );
}

export default About;
