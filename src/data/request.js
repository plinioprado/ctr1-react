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
  const url = `${config.url_base_api}${path}`;
  const result = await doRequest(url, "DELETE", api_key);
  return result;
}

export async function download(path, api_key) {
  const url = `${config.url_base_api}${path}`;
  const fileName = getFileName(url);
  const result = await doRequestDownload(url, "GET", api_key);
  const blob = await result.blob();
  downloadFile(blob, fileName);

  return "ok";

  function getFileName(url) {
    const resource_path = url.split("?")[0].split("/");
    const name = `${resource_path[resource_path.length - 3]}.${resource_path[resource_path.length - 1]}`;
    return name;
  }

  function downloadFile(blob, fileName) {
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  }
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

  if (!response || response.status !== 200) {
    await handleRequestError(response);
  }

  const json = await response.json();

  return json;
};

const doRequestDownload = async (url, method, api_key) => {
  let options = {
    method: method,
    cache: "no-store",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };
  const response = await fetch(url, options);

  if (!response || response.status !== 200) {
    await handleRequestError(response);
  }

  return response;
};

const handleRequestError = async (response) => {
  const responseBody = await response.text();
  const bodyObj = responseBody ? JSON.parse(responseBody) : {};
  const message = bodyObj.message.replace("Error: ", "") || "";

  if (!responseBody || responseBody === "{}") {
    throw new Error(`Response error ${response.status}: ${message}`);
  }

  throw new Error(`Response error ${response.status}: ${message}`);
};
