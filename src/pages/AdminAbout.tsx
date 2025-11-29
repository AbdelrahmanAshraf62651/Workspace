import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faClock,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useAbout } from '../contexts/AboutContext';
import type { AboutSettings } from '../types';

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
  const { settings, updateSettings } = useAbout();
  const [formData, setFormData] = useState<AboutSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(settings);
    setHasChanges(false);
  }, [settings]);

  const handleInputChange = (
    section: 'location' | 'contact',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleDayToggle = (
    day: keyof AboutSettings['openingHours'],
    isOpen: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          isOpen,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleTimeChange = (
    day: keyof AboutSettings['openingHours'],
    timeType: 'openTime' | 'closeTime',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [timeType]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateSettings(formData);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    setFormData(settings);
    setHasChanges(false);
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

      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Business Settings</h5>
          <p className="text-muted mb-4">
            Configure your public-facing business information.
          </p>

          {/* Location Settings */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
              <h6 className="mb-0 fw-bold">Location Settings</h6>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location.address}
                  onChange={(e) =>
                    handleInputChange('location', 'address', e.target.value)
                  }
                  placeholder="Enter full address"
                />
              </div>
              <div className="col-md-4">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location.city}
                  onChange={(e) =>
                    handleInputChange('location', 'city', e.target.value)
                  }
                  placeholder="Enter city"
                />
              </div>
              <div className="col-md-4">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location.country}
                  onChange={(e) =>
                    handleInputChange('location', 'country', e.target.value)
                  }
                  placeholder="Enter country"
                />
              </div>
              <div className="col-md-4">
                <Form.Label>
                  Map Link <span className="text-muted">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location.mapLink}
                  onChange={(e) =>
                    handleInputChange('location', 'mapLink', e.target.value)
                  }
                  placeholder="https://maps.app.goo.gl/example"
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Opening Hours */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faClock} className="text-primary" />
              <h6 className="mb-0 fw-bold">Opening Hours</h6>
            </div>
            <div className="row g-3">
              {DAYS.map(({ key, label }) => {
                const dayData = formData.openingHours[key];
                return (
                  <div key={key} className="col-12">
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={dayData.isOpen}
                          onChange={(e) =>
                            handleDayToggle(key, e.target.checked)
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
                      {dayData.isOpen ? (
                        <div className="d-flex align-items-center gap-2 flex-grow-1">
                          <Form.Control
                            type="time"
                            value={dayData.openTime}
                            onChange={(e) =>
                              handleTimeChange(key, 'openTime', e.target.value)
                            }
                            style={{ maxWidth: '150px' }}
                          />
                          <span className="text-muted">-</span>
                          <Form.Control
                            type="time"
                            value={dayData.closeTime}
                            onChange={(e) =>
                              handleTimeChange(key, 'closeTime', e.target.value)
                            }
                            style={{ maxWidth: '150px' }}
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
          </div>

          <hr className="my-4" />

          {/* Contact Information */}
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <FontAwesomeIcon icon={faPhone} className="text-primary" />
              <h6 className="mb-0 fw-bold">Contact Information</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    handleInputChange('contact', 'phone', e.target.value)
                  }
                  placeholder="+1 (555) 987-6545"
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleInputChange('contact', 'email', e.target.value)
                  }
                  placeholder="contact@techbusiness.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3">
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={!hasChanges}
        >
          Cancel
        </Button>
        <Button
          className="sec-btn"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}

export default AdminAbout;

