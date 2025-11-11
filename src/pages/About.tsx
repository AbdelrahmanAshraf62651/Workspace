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

import heroPic from '../assets/images/about/image.png';

function About() {
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
          <button className="sec-btn btn-lg rounded-1">
            Discover More
          </button>
        </div>
        <div className="col-12 col-lg-6 pe-lg-3">
          <img src={heroPic} alt="landscape" className="img-fluid rounded-2" />
        </div>
      </div>
      <div className="loaction-map mt-3 p-3 p-lg-4 rounded border g-4">
        <p className="fs-2 fw-bold">Our Location</p>
        <iframe
          className="col-12"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.66717872805!2d31.245493534800627!3d30.061764094951126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841b80df27891%3A0xf2a201caea65c2b3!2sRamsis%20Square!5e0!3m2!1sen!2seg!4v1755849468072!5m2!1sen!2seg"
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
                  <div>
                    123 Innovation Drive, Suite 400, Metropole City, MC 12345
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <FontAwesomeIcon icon={faPhone} />
                  <div>(+20) 112-345-6789</div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div>contact@example.com</div>
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
                <div className="d-flex gap-2 align-items-center mb-2">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    Monday - Friday:{' '}
                    <span className="ms-2">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    Saturday: <span className="ms-2">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-2">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    Sunday: <span className="ms-2">Closed</span>
                  </div>
                </div>
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
