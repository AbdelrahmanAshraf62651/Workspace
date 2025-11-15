import { Link, useNavigate } from 'react-router-dom';
import img from '/images/signup/signup.jpg';
function Signup() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: '100vh' }}>
        <div
          className="col-lg-6 d-none d-lg-block"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="col-12 py-5 col-lg-6 d-flex align-items-center justify-content-center flex-column">
          <div
            className="bg-white rounded-3 shadow-sm p-3 p-md-4 p-lg-5 w-100"
            style={{ maxWidth: '480px', border: 'solid 1px var(--grey-color)' }}
          >
            <div className="row">
              <div className="col-12">
                <h1 className="fw-bold fs-2 text-dark mb-2 mt-0 text-center text-lg-center">
                  Create Your Account
                </h1>
                <p className="text-muted mb-4 text-center text-lg-center">
                  Join WorkWise to streamline your team's collaboration and
                  productivity.
                </p>
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
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-md"
                  id="fullName"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  id="email"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control form-control-md"
                  id="phone"
                  placeholder="+1 (555) 123-4567"
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
                <div className="form-text text-muted small">
                  Password must be at least 8 characters long, include an
                  uppercase letter, a number, and a symbol.
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-md"
                  id="confirmPassword"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="form-check d-flex gap-2 align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label className="form-check-label text-muted small gap-1 d-flex align-items-center">
                    <span>I agree to the</span>
                    <a
                      href="#"
                      className="text-decoration-none fw-semibold"
                      style={{ color: 'var(--black-color)' }}
                    >
                      Terms of Service
                    </a>
                    <span>and</span>
                    <a
                      href="#"
                      className="text-decoration-none fw-semibold"
                      style={{ color: 'var(--black-color)' }}
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <button type="submit" className="btn btn-dark w-100 py-2 fs-6">
                  Register
                </button>
              </div>
              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-decoration-none fw-semibold"
                  style={{ color: 'var(--black-color)' }}
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
