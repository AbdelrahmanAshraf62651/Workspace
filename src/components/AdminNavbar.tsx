import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '/logo.png';

function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
    window.location.reload();
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? 'nav-link ms-2 active' : 'nav-link ms-2';

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container-fluid ms-2 me-2">
        <NavLink className="navbar-brand" to="/dashboard" end>
          <img src={logo} alt="Logo" style={{ maxHeight: '30px' }} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbarContent"
          aria-controls="adminNavbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbarContent">
          <ul className="navbar-nav text-center text-lg-start me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/room-availability">
                Room Availability
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/edit-room-schedule">
                Edit Room Schedule
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/analytics">
                Analytics
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/admin-gallery-management">
                Gallery Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/cafe-management">
                Cafe Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/booking-management">
                Booking Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/admin-about-settings">
                About Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/contact-messages">
                Messages
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item d-lg-none mt-2">
                <button className="btn btn-dark w-100" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn && (
          <div className="d-none d-lg-flex">
            <button className="btn btn-dark" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;
