import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const isUserLoggedIn = localStorage.getItem("authToken") !== null;
  useEffect(() => {
    if (localStorage.getItem("userId")){
      axios
      .get(`https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/user/${localStorage.getItem("userId")}`)
      .then((response) => {
        setUserImage(response.data.image);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [isUserLoggedIn]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "nav-link ms-2 active" : "nav-link ms-2";
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top ">
      <div className="container-fluid ms-2 me-2">
        <NavLink className="navbar-brand" to="/" end>
          <img src={logo} alt="Logo" style={{ maxHeight: "30px" }} />
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
          {isLoggedIn ? (
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
                <NavLink to="/profile" className={getLinkClass}>
                  Profile
                </NavLink>
              </li>
              <li className="nav-item d-lg-none">
                <button className={"btn btn-dark w-100"} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
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
        {isLoggedIn ? (
          <div className="d-none d-lg-flex gap-3 align-items-center">
            <button className={"btn btn-dark"} onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            <NavLink to="/profile" className="">
              <img
                src={userImage || "/images/user.webp"}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px"  , objectFit: "cover" }}
              />
            </NavLink>
          </div>
        ) : (
          <div className="d-none d-lg-flex gap-3">
            <NavLink className={"btn btn-light"} to="/signup">
              Sign Up
            </NavLink>
            <NavLink className={"btn btn-dark"} to="/login">
              Log In
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
