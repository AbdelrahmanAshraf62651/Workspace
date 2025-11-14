import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import img from '../assets/images/login/login.jpg';

function Login() {
  const navigate = useNavigate();
  return (
    <div className=" vh-100">
      <div className="row h-100 m-0 justify-content-center align-items-center">
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center flex-column">
          <div
            className="bg-white rounded-3 shadow-sm p-3 w-100"
            style={{ maxWidth: '480px', border: 'solid 1px var(--grey-color)' }}
          >
            <div className="row">
              <div className="col-12">
                <h1 className="fw-bold fs-2 text-dark mb-2 mt-0 text-center text-lg-center">
                  Welcome Back!
                </h1>
                <p className="text-muted mb-4 text-center text-lg-center">
                  Sign in to access your workspace.
                </p>
                <button
                  className="main-btn w-100 rounded-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    border: 'solid 2px var(--grey-color)',
                    backgroundColor: 'inherit',
                  }}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  <span>Sign in with Google</span>
                </button>
                <div className="position-relative py-2 text-center">
                  <hr />
                  <span
                    className="position-absolute"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    OR
                  </span>
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-md"
                  id="password"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="form-check text-end ">
                  <a
                    href="#"
                    className="text-decoration-none fw-semibold"
                    style={{ color: 'var(--black-color)' }}
                  >
                    Forget Password ?
                  </a>
                </div>
              </div>
              <div className="mb-4">
                <button type="submit" className="btn btn-dark w-100 py-2 fs-6">
                  Login
                </button>
              </div>
              <div className="text-start d-flex gap-2 align-items-center">
                <span className="text-muted">Don't have an account?</span>
                <Link
                  to="/signup"
                  className="text-decoration-none fw-semibold"
                  style={{ color: 'var(--black-color)' }}
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div
          className="col-lg-6 d-none d-lg-block h-100"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
