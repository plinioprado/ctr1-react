import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SessionContext } from "../../SessionContext";

import TabRows from "./TabRows";
import FieldBoolean from "../fields/FieldBoolean";
import FielInteger from "../fields/FieldInteger";
import FieldSelect from "../fields/FieldSelect";
import FieldText from "../fields/FieldText";
import FieldAmount from "../fields/FieldAmount";
import FieldDate from "../fields/FieldDate";

import { get, post, put, del } from "../../data/request";

function Tab() {
  const { session } = useContext(SessionContext);

  const location = useLocation(null);
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState(null);
  const [format, setFormat] = useState(null);
  const [reload, setReload] = useState(false);

  const getUrl = () => {
    const key = session.menu_options
      .filter((op) => op.value === `/${params.component}/${params.resource}`)[0]
      .key.replace("_path_routing", "_path_api");
    const url = session.menu_options.filter((op) => op.key === key)[0].value;
    return `${url}`;
  };
  const url = getUrl();

  useEffect(() => {
    async function fetchData() {
      const response = await get(
        `${url}/${params.id}`,
        session.user.api_key,
        "",
      );

      setData(response.data);
      setFormat(response.format);
    }
    fetchData();
  }, [location.key, params.component, params.resource, params.id, reload]);

  const [message, setMessage] = useState("");

  const dataChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleChange = (e, val) => {
    // val optional param because e.target.val is always text
    setData({
      ...data,
      [e.target.name]: val !== undefined ? val : e.target.value,
    });
  };

  async function onSubmit(op) {
    try {
      if (op === "sub") {
        if (params.id === "new") {
          await post(url, session.user.api_key, data);
        } else {
          await put(url, session.user.api_key, data);
        }
      } else {
        await del(`${url}/${params.id}`, session.user.api_key);
      }

      await navigate(`/${params.component}/${params.resource}`);
    } catch (err) {
      setMessage(err.message);
    }
  }

  const onReturn = async () => {
    navigate(`/${params.component}/${params.resource}`);
  };

  return (
    <main>
      {!data || !format ? (
        <div className="container">
          <p>Loading</p>
        </div>
      ) : (
        <div className="container">
          <div className="col data-form-header">
            <h2>{format.h2}</h2>
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
              ) : format_field.type === "amount" ? (
                <FieldAmount
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
              ) : format_field.type === "date" ? (
                <FieldDate
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
          {data && data.rows && format && (
            <TabRows
              dataRows={data.rows}
              formatRows={format.rows}
              dataChange={dataChange}
            />
          )}
          <div className="data-form-footer">
            {params.id !== "new" && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => onSubmit("del")}
              >
                Delete
              </button>
            )}
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
