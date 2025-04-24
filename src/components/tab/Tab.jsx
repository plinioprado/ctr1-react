import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../../SessionContext";

import FieldText from "../fields/FieldText";
import FielInteger from "../fields/FieldInteger";

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

  const onSubmit = async () => {
    try {
      setSession({ ...session, data: data });
      navigate(`/${params.table}`);
    } catch (error) {
      setMessage(`request failed ${error.message}`);
    }
  };

  const onDelete = async () => {
    try {
      navigate(`/${params.table}`);
    } catch (error) {
      setMessage(`Login failed ${error.message}`);
    }
  };

  const onReturn = async () => {
    navigate(`/${params.table}`);
  };

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          <h2>{format.h2}</h2>
          <div className="col data-form-header">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={onReturn}
            >
              Return
            </button>
          </div>
          <div className="row">
            {format.fields.map((format_field) =>
              format_field.type === "integer" ? (
                <FielInteger
                  data_field={data[format_field.name]}
                  format_field={format_field}
                  handleChange={handleChange}
                  key={format_field.name}
                />
              ) : (
                <FieldText
                  data_field={data[format_field.name]}
                  format_field={format_field}
                  handleChange={handleChange}
                  key={format_field.name}
                />
              ),
            )}
          </div>
          <div className="data-form-footer">
            <button
              className="btn btn-primary"
              type="button"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={onSubmit}
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
