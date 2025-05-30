import config from "../config.json";

export async function get(path, api_key, qString) {
  const url = `${config.url_base_api}${path}${qString || ""}`;
  const result = await doRequest(url, "GET", api_key);

  return result;
}

export async function post(qPath, api_key, data) {
  const url = `${config.url_base_api}${qPath}`;
  const result = await doRequest(url, "POST", api_key, data);
  return result;
}

export async function put(path, api_key, data) {
  const url = `${config.url_base_api}${path}`;
  const result = await doRequest(url, "PUT", api_key, data);
  return result;
}

export async function del(path, api_key) {
  const url = `http://localhost:8000${config.url_base_api}${path}`;
  const result = await doRequest(url, "DELETE", api_key);
  return result;
}

const doRequest = async (url, method, api_key, body) => {
  let options = {
    method: method,
    cache: "no-store",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };
  if (body !== null) options.body = JSON.stringify(body);

  const response = await fetch(url, options);

  if (response.status !== 200) {
    const responseBody = await response.text();
    const bodyObj = responseBody ? JSON.parse(responseBody) : {};
    const message = bodyObj.message.replace("Error: ", "") || "";

    if (!responseBody || responseBody === "{}") {
      throw new Error(`Response error ${response.status}: ${message}`);
    }

    throw new Error(`Response error ${response.status}: ${message}`);
  }

  const json = await response.json();

  return json;
};
