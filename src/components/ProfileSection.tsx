import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  phone_number: string;
  image: string;
}

function ProfileSection() {
  const location = useLocation();
  const [data, setData] = useState<UserData>({
    name: "",
    email: "",
    phone_number: "",
    image: "",
  });
  const isProfilePage = location.pathname === "/profile";
  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    axios
      .get(`https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/user/${user_id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [isProfilePage]);
  const [isEditing, setIsEditing] = useState(false);
  function handleSaveChanges() {
    axios
      .put(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/user/${localStorage.getItem("userId")}`,
        data
      )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  }
  return (
    <>
      {isEditing ? (
        <div className="p-4 shadow-sm">
        <h2 className="mb-4 fw-bold">My Profile</h2>
        <div className="row align-items-start g-4">
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
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                  onChange={(e) => setData({ ...data, email: e.target.value })}
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
                  value={data.phone_number}
                  onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-success rounded-pill d-flex align-items-center"
            id="edit-profile-btn"
            onClick={handleSaveChanges}
          >
            <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill d-flex align-items-center ms-3"
            id="edit-profile-btn"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      ) : (
        <div className="p-4 shadow-sm">
          <h2 className="mb-4 fw-bold">My Profile</h2>
          <div className="row align-items-start g-4">
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
                    value={data.phone_number}
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
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faPencilAlt} className="me-2"  />
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileSection;
