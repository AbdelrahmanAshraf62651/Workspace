import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      style={{ height: "77vh" }}
    >
      <form onSubmit={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }} className="border border-2 p-3 rounded-3">
        <div className="d-flex justify-content-between align-items-center">
          <label className="fs-4" htmlFor="username">User Name</label>
          <input id="username" className="fs-4 me-2 ms-2 px-4 py-1" type="text" />
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <label className="fs-4" htmlFor="password">Password</label>
          <input id="password" className="fs-4 me-2 ms-2 px-4 py-1" type="password" />
        </div>
        <br />
        <button className="btn btn-dark btn-lg"type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
