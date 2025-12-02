import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faLocationDot,
//   faClock,
//   faPhone,
// } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

function AdminAbout() {
  const navigate = useNavigate();

  // const [aboutData, setAboutData] = useState(null);

  const [address, setAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [locationLink, setLocationLink] = useState('');

  const [openingHours, setOpeningHours] = useState({
    monday: { id: 1, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    tuesday: { id: 2, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    wednesday: { id: 3, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    thursday: { id: 4, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    friday: { id: 5, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    saturday: { id: 6, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    sunday: { id: 7, isOpen: false, openTime: '10AM', closeTime: '7PM' },
  });

  const [showToast, setShowToast] = useState(false);

  // Fetch Data Once
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/location/1')
      .then((response) => {
        const data = response.data;
        // setAboutData(data);

        setAddress(data.address || '');
        setContactPhone(data.contact_phone || '');
        setContactEmail(data.contact_email || '');
        setLocationLink(data.location_link || '');
        setOpeningHours(data.opening_hours || openingHours);
      })
      .catch((error) => {
        console.error('Error fetching about info:', error);
      });
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSave = () => {
    axios
      .patch('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/location/1', {
        address,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        location_link: locationLink,
        opening_hours: openingHours,
      })
      .then(() => {
        setShowToast(true);

        const btn = document.querySelector('.sec-btn');
        btn?.classList.add('saved');
        setTimeout(() => btn?.classList.remove('saved'), 600);
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  };

  const handleCancel = () => navigate(0);

  const hasChanges = true;

  return (
    <div className="container pt-5">
      <div
        className={`toast position-fixed bottom-0 end-0 m-3 text-bg-success shadow-lg ${
          showToast ? 'show' : 'hide'
        }`}
        style={{ transition: '0.4s' }}
      >
        <div className="toast-body fw-semibold">
          Settings saved successfully!
        </div>
      </div>

      <div className="mb-4">
        <h1 className="fw-bold">About Settings</h1>
        <p className="text-muted">Manage your business public profile.</p>
      </div>

      <div className="shadow-sm mb-4 p-4">
        {/* Location */}
        <h5 className="fw-bold mb-3">Location Settings</h5>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full address"
            />
          </div>

          <div className="col-md-6">
            <Form.Label>Map Link</Form.Label>
            <Form.Control
              type="text"
              value={locationLink}
              onChange={(e) => setLocationLink(e.target.value)}
              placeholder="https://maps.app.goo.gl/example"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* Opening Hours */}
        <h5 className="fw-bold mb-3">Opening Hours</h5>
        <div className="row g-3">
          {DAYS.map(({ key, label }) => {
            const day = openingHours[key];
            return (
              <div key={key} className="col-md-6">
                <div className="d-flex align-items-center gap-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={day.isOpen}
                      onChange={(e) =>
                        setOpeningHours({
                          ...openingHours,
                          [key]: { ...day, isOpen: e.target.checked },
                        })
                      }
                      id={`switch-${key}`}
                    />
                    <label
                      className="form-check-label fw-semibold"
                      htmlFor={`switch-${key}`}
                    >
                      {label}
                    </label>
                  </div>

                  {day.isOpen ? (
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                      <Form.Control
                        type="text"
                        value={day.openTime}
                        onChange={(e) =>
                          setOpeningHours({
                            ...openingHours,
                            [key]: { ...day, openTime: e.target.value },
                          })
                        }
                        style={{ maxWidth: '100px' }}
                      />

                      <span className="text-muted">-</span>

                      <Form.Control
                        type="text"
                        value={day.closeTime}
                        onChange={(e) =>
                          setOpeningHours({
                            ...openingHours,
                            [key]: { ...day, closeTime: e.target.value },
                          })
                        }
                        style={{ maxWidth: '100px' }}
                      />
                    </div>
                  ) : (
                    <span className="text-muted">Closed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-4" />

        {/* Contact */}
        <h5 className="fw-bold mb-3">Contact Information</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+1 (555) 987-6545"
            />
          </div>

          <div className="col-md-6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="contact@business.com"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3">
        <button
          className="btn main-btn"
          onClick={handleCancel}
          disabled={!hasChanges}
        >
          Cancel
        </button>
        <button
          className="btn sec-btn"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default AdminAbout;
