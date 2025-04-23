import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import { get } from "../../data/request";

function Tab() {
  const { session, setSession } = useContext(SessionContext);

  const location = useLocation(null);
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url = `${params.table}/${params.id}`;
      const newData = await get(url);
      setData(newData.data);
      setFormat(newData.format);
    }
    fetchData();
  }, [location.key, params.table]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setSession({ ...session, data: data });
      navigate(`/${params.table}`);
    } catch (error) {
      setMessage(`request failed ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      navigate(`/${params.table}`);
    } catch (error) {
      setMessage(`Login failed ${error.message}`);
    }
  };

  function TabField(format_field) {
    console.log(format_field.field);
    return (
      <div
        className={`col-sm-${format_field.field.size}`}
        key={format_field.field.name}
      >
        <label>{format_field.field.label}</label>
        <input
          type={format_field.field.type}
          className="form-control"
          name={format_field.field.name}
          value={data[format_field.field.name]}
          onChange={handleChange}
          disabled={format_field.field.primary}
        />
      </div>
    );
  }

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          <h3>{format.header}</h3>
          <div className="row">
            {format.fields.map((field) => (
              <TabField field={field} />
            ))}
          </div>
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
      )}
    </main>
  );
}

export default Tab;
