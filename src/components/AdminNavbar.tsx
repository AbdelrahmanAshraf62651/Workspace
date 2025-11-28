import { NavLink } from 'react-router-dom';
// import profilePic from '../assets/images/profile.jpg';

function AdminNavbar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'nav-link ms-2 active' : 'nav-link ms-2';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container-fluid ms-2 me-2">
        <NavLink className="navbar-brand" to="/dashboard" end>
          SpaceX
        </NavLink>
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
              <NavLink className={getLinkClass} to="/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getLinkClass} to="/access-history">
                Access History
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
            <li className='nav-item'>
              <NavLink className={getLinkClass} to="/cafe-management">
                Cafe Management
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={getLinkClass} to="/booking-management">
                Booking Management
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={getLinkClass} to="/about-management">
                About Management
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={getLinkClass} to="/messages">
                Messages
              </NavLink>
            </li>            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
