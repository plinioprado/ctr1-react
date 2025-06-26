import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import { post } from "../../data/request";

function Login() {
  const location = useLocation(null);
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);

  useEffect(() => {
    setSession(null);
  }, [location.key]);

  const [data, setData] = useState({
    user_email: "john.doe@example.com",
    user_pass: "12345",
    entity: "example",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await post("/api/login", "", data);
      setSession({ ...response.data });
      navigate("/home");
    } catch (error) {
      setMessage(`Login failed ${error.message}`);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="login">
          <h2>Login</h2>
          <label htmlFor="user_email">User</label>
          <input
            type="text"
            className="form-control"
            id="user_email"
            name="user_email"
            value={data.user_email}
            onChange={handleChange}
          />
          <label htmlFor="user_pass">Password</label>
          <input
            type="text"
            className="form-control"
            id="user_pass"
            name="user_pass"
            value={data.user_pass}
            onChange={handleChange}
          />
          <label htmlFor="entity">Entity</label>
          <input
            type="text"
            className="form-control"
            id="entity"
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
