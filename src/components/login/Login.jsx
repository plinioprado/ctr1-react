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
    try {
      const response = await post("ctr1/login", "", data);
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
