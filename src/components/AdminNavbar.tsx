import '../styles/variables.css';
import './Navbar.css';

import profilePic from '../assets/images/profile.jpg';

function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top container">
      <div className="container-fluid ms-2 me-2">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav text-center text-lg-start me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link ms-2"
                aria-current="page"
                href="#"
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-2" href="#">
                Access History
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-2" href="#">
                Room Availability
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-2" href="#">
                Edit Room Schedule
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link ms-2 active" href="#">
                Analytics
              </a>
            </li>
          </ul>
        </div>
        <div className="profile-img d-none d-lg-block">
          <img
            src={profilePic}
            alt="Profile Picture"
            className="img-fluid rounded-pill"
          />
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
