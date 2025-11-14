import { NavLink } from 'react-router-dom';
// import '../styles/variables.css';
// import './Navbar.css';

// import profilePic from '../assets/images/profile.jpg';

function Navbar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'nav-link ms-2 active' : 'nav-link ms-2';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top ">
      <div className="container-fluid ms-2 me-2">
        <NavLink className="navbar-brand" to="/" end>
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
              <NavLink className={getLinkClass} to="/profile">
                Profile
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
            <li className='nav-item d-lg-none'>
              <NavLink className={getLinkClass} to="/signup">Sign Up</NavLink>
            </li>
            <li className='nav-item d-lg-none'>
              <NavLink className={getLinkClass} to="/Login">Log In</NavLink>
            </li>
          </ul>
        </div>
        <div className="d-none d-lg-flex gap-3">
          <NavLink className={"btn btn-light"} to="/signup">Sign Up</NavLink>
          <NavLink className={"btn btn-dark"} to="/Login">Log In</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
