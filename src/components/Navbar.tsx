import { NavLink } from 'react-router-dom';
// import '../styles/variables.css';
// import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '/logo.png';
import profilePic from '/images/profile.jpg';

function Navbar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'nav-link ms-2 active' : 'nav-link ms-2';
  };
  const handleLogout = () => {
    localStorage.setItem('isUserLoggedIn', 'false');
    window.location.href = '/';
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top ">
      <div className="container-fluid ms-2 me-2">
        <NavLink className="navbar-brand" to="/" end>
          <img src={logo} alt="Logo" style={{ maxHeight: '30px' }} />
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
          {localStorage.getItem('isUserLoggedIn') === 'true' ? (
            <ul className="navbar-nav text-center text-lg-start me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/gallery" end>
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/booking">
                  Booking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/cafe">
                  Cafe
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <NavLink className={getLinkClass} to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <NavLink className={getLinkClass} to="/login">
                  Log In
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav text-center text-lg-start me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/gallery" end>
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/cafe">
                  Cafe
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getLinkClass} to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <NavLink className={getLinkClass} to="/signup">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <NavLink className={getLinkClass} to="/login">
                  Log In
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        {localStorage.getItem('isUserLoggedIn') === 'true' ? (
          <div className="d-none d-lg-flex gap-3 align-items-center">
            <button className={'btn btn-dark'} onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            <NavLink to="/profile" className="">
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '40px', height: '40px' }}
              />
            </NavLink>
          </div>
        ) : (
          <div className="d-none d-lg-flex gap-3">
            <NavLink className={'btn btn-light'} to="/signup">
              Sign Up
            </NavLink>
            <NavLink className={'btn btn-dark'} to="/login">
              Log In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
