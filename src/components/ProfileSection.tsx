import profileImg from '../assets/images/profile.jpg';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const data = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
};

function ProfileSection() {
  return (
    <>
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4 fw-bold">My Profile</h2>
        <div className="row align-items-start g-4">
          <div className="col-12 col-md-auto d-flex justify-content-center">
            <div className="profile-image-container mb-3">
              <img
                id="user-profile-image"
                src={profileImg}
                className="img-fluid rounded-circle"
                alt="User Profile Image"
                style={{ maxWidth: '150px' }}
              />
            </div>
          </div>
          <div className="col">
            <form id="profile-form">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={data.name}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={data.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={data.phone}
                  disabled
                />
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill d-flex align-items-center"
            id="edit-profile-btn"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
