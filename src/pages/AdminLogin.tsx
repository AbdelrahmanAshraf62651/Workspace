import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  interface LoginPayload {
    email: string;
    password: string;
  }

  const navigate = useNavigate();

  function handleLogin(props: LoginPayload) {
    setIsLoading(true);

    const loginUrl =
      "https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/auth/login";

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("role", data.role);

        setIsLoading(false);

        // 🔥 Redirect based on role
        if (data.role === "admin") {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error);
        setIsLoading(false);
      });
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      style={{ height: "77vh" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin({ email, password });
        }}
        className="border border-2 p-3 rounded-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <label className="fs-4" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="fs-4 me-2 ms-2 px-4 py-1"
            type="text"
          />
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <label className="fs-4" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="fs-4 me-2 ms-2 px-4 py-1"
            type="password"
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <br />
        <button className="btn btn-dark btn-lg" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            ></span>
          ) : (
            "Login"
          )}
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
