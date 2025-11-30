import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
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

interface DayOpeningHours {
  id: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}
interface OpeningHours {
  [key: string]: DayOpeningHours;
}
interface AboutInfo {
  id: number;
  address: string;
  contact_phone: string;
  contact_email: string;
  location_link: string;
  opening_hours: OpeningHours;
  // Add other fields as necessary
}

function AdminAbout() {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState<AboutInfo | null>(null);
  const [address, setAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { id: 1, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    tuesday: { id: 2, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    wednesday: { id: 3, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    thursday: { id: 4, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    friday: { id: 5, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    saturday: { id: 6, isOpen: false, openTime: '10AM', closeTime: '7PM' },
    sunday: { id: 7, isOpen: false, openTime: '10AM', closeTime: '7PM' },
  });
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/location/1')
      .then((response) => {
        const data = response.data;
        setAboutData(data);
      })
      .catch((error) => {
        console.error('Error fetching about info:', error);
      });

    setAddress(aboutData?.address || '');
    setContactPhone(aboutData?.contact_phone || '');
    setContactEmail(aboutData?.contact_email || '');
    setLocationLink(aboutData?.location_link || '');
  }, [
    aboutData?.address,
    aboutData?.contact_email,
    aboutData?.contact_phone,
    aboutData?.location_link,
  ]);
  const hasChanges = true; // Implement logic to check if there are unsaved changes

  const handleSave = () => {
    axios
      .patch('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/location/1', {
        address: address,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        location_link: locationLink,
        opening_hours: openingHours,
      })
      .then(() => {
        console.log('Settings saved successfully');
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  };
  const handleCancel = () => {
    navigate(0);
  };

  return (
    <div className="container pt-5">
      <div className="mb-4">
        <h1 className="fw-bold">About Settings</h1>
        <p className="text-muted">
          Manage your business's public profile, including location, operating
          hours, and contact details.
        </p>
      </div>

      <div className="shadow-sm mb-4">
        <div className="p-4">
          <h5 className="fw-bold mb-3">Business Settings</h5>
          <p className="text-muted mb-4">
            Configure your public-facing business information.
          </p>

          {/* Location Settings */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faLocationDot} className="text-black" />
              <h6 className="mb-0 fw-bold">Location Settings</h6>
            </div>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={aboutData?.address || ''}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  placeholder="Enter full address"
                />
              </div>
              <div className="col-12 col-md-6">
                <Form.Label>
                  Map Link <span className="text-muted">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={aboutData?.location_link || ''}
                  onChange={(e) => setLocationLink(e.target.value)}
                  placeholder="https://maps.app.goo.gl/example"
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Opening Hours */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faClock} className="text-black " />
              <h6 className="mb-0 fw-bold">Opening Hours</h6>
            </div>
            <div className="row g-3">
              {DAYS.map(({ key, label }) => {
                const dayData = openingHours[key];
                return (
                  <div key={key} className="col-12 col-md-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={dayData?.isOpen || false}
                          onChange={(e) =>
                            setOpeningHours({
                              ...openingHours,
                              [key]: {
                                ...openingHours[key],
                                isOpen: e.target.checked,
                              },
                            })
                          }
                          id={`switch-${key}`}
                        />
                        <label
                          className="form-check-label fw-semibold"
                          htmlFor={`switch-${key}`}
                          style={{ minWidth: '100px' }}
                        >
                          {label}
                        </label>
                      </div>
                      {dayData?.isOpen ? (
                        <div className="d-flex align-items-center gap-2 flex-grow-1">
                          <Form.Control
                            type="number"
                            value={parseInt(dayData.openTime)}
                            onChange={(e) =>
                              setOpeningHours({
                                ...openingHours,
                                [key]: {
                                  ...openingHours[key],
                                  openTime: e.target.value,
                                },
                              })
                            }
                            style={{ maxWidth: '100px' }}
                          />
                          <span className="text-muted">AM</span>
                          <span className="text-muted">-</span>
                          <Form.Control
                            type="number"
                            value={parseInt(dayData.closeTime)}
                            onChange={(e) =>
                              setOpeningHours({
                                ...openingHours,
                                [key]: {
                                  ...openingHours[key],
                                  closeTime: e.target.value,
                                },
                              })
                            }
                            style={{ maxWidth: '100px' }}
                          />
                          <span className="text-muted">PM</span>
                        </div>
                      ) : (
                        <span className="text-muted">Closed</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="my-4" />

          {/* Contact Information */}
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faPhone} className="text-black" />
              <h6 className="mb-0 fw-bold">Contact Information</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={contactPhone || ''}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 987-6545"
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={contactEmail || ''}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@techbusiness.com"
                />
              </div>
            </div>
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
