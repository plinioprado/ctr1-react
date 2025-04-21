import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    user_email: "john.doe@example.com",
    user_pass: "12345",
    entity: "test",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    navigate("/");
  };

  return (
    <main>
      <div className="container">
        <div className="login">
          <h3>Login</h3>
          <label>User</label>
          <input
            type="text"
            className="form-control"
            name="user_email"
            value={data.user_email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            name="user_pass"
            value={data.user_pass}
            onChange={handleChange}
          />
          <label>Entity</label>
          <input
            type="text"
            className="form-control"
            name="entity"
            value={data.entity}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="text-error">{message}</div>
        </div>
      </div>
    </main>
  );
}

export default Login;
