import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SessionContext } from "../../SessionContext";

import FieldBoolean from "../fields/FieldBoolean";
import FielInteger from "../fields/FieldInteger";
import FieldSelect from "../fields/FieldSelect";
import FieldText from "../fields/FieldText";

import { get, post, put, del } from "../../data/request";

function Tab() {
  const { session } = useContext(SessionContext);

  const location = useLocation(null);
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);

  const getUrl = () => {
    const key = session.menu_options
      .filter((op) => op.value === `/${params.table}`)[0]
      .key.replace("_path_routing", "_path_api");
    const url = session.menu_options.filter((op) => op.key === key)[0].value;
    return `ctr1${url}/${params.id}`;
  };

  useEffect(() => {
    async function fetchData() {
      const url = getUrl();
      console.log("url", url);
      const response = await get(url, session.user.api_key, "");

      setData(response.data);
      setFormat(response.format);
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

  async function onSubmit(op) {
    try {
      const qPath = `ctr1/${params.table}/${params.id}`;
      if (op === "sub") {
        if (params.id === "new") {
          await post(qPath, session.user.api_key, data);
        } else {
          await put(qPath, session.user.api_key, data);
        }
      } else {
        await del(`${qPath}`, session.user.api_key);
      }

      await navigate(`/${params.table}`);
    } catch (err) {
      setMessage(err.message);
    }
  }

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
              ) : format_field.type === "select" ? (
                <FieldSelect
                  data_field={data[format_field.name]}
                  format_field={format_field}
                  handleChange={handleChange}
                  key={format_field.name}
                />
              ) : format_field.type === "boolean" ? (
                <FieldBoolean
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
              onClick={() => onSubmit("del")}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => onSubmit("sub")}
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
