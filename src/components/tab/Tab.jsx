import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

function Tab() {
  const location = useLocation(null);
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);

  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      key: "entity_name",
      value: "Example Test Ltd",
    });
  }, [location.key]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(1, session);
      console.log(2, data);
      setSession({ ...session, data: data });
      console.log(3, session);
      navigate("/tab");
    } catch (error) {
      setMessage(`Login failed ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/tab");
    } catch (error) {
      setMessage(`Login failed ${error.message}`);
    }
  };

  return (
    <main>
      <div className="container">
        <h3>Session</h3>
        <label>Key</label>
        <input
          type="text"
          className="form-control"
          name="key"
          value={data.key}
          onChange={handleChange}
        />
        <label>Value</label>
        <input
          type="text"
          className="form-control"
          name="user_pass"
          value={data.value}
          onChange={handleChange}
        />
        <div className="data-form-footer">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="text-error">{message}</div>
      </div>
    </main>
  );
}

export default Tab;
