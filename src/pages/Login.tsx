import { Link, useNavigate } from 'react-router-dom';
import img from '/images/login/login.jpg';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  interface LoginPayload {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  function handleLogin(props: LoginPayload) {
    setIsLoading(true);
    const loginUrl =
      'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/auth/login';

    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Your API returns:
        // { "authToken": "token", "role": "customer" }

        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', JSON.stringify(data.userId));
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/auth/me', {
          headers: {
            Authorization: `Bearer ${data.authToken}`,
          },
        })
          .then((response) => response.json())
          .then((user) => {
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_name', user.name);

            setIsLoading(false);

            if (data.role === 'admin') {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          });
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error:', error);
        setIsLoading(false);
      });
  }

  return (
    <div className="vh-100">
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
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setError('');
                handleLogin({ email, password });
              }}
            >
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Email</label>
                <input
                  type="email"
                  className="form-control form-control-md"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Password</label>
                <input
                  type="password"
                  className="form-control form-control-md"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="text-danger mb-3">{error}</div>}

              <div className="mb-4">
                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 fs-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                  ) : (
                    'Login'
                  )}
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
          }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
