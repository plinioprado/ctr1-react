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

export async function download(path, api_key, defaultFileName = "download") {
  const url = `${config.url_base_api}${path}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });

  if (!response.ok) {
    const responseBody = await response.text();
    let message = "";

    if (responseBody) {
      try {
        const bodyObj = JSON.parse(responseBody);
        message = bodyObj.message?.replace("Error: ", "") || "";
      } catch {
        message = responseBody;
      }
    }

    throw new Error(`Response error ${response.status}: ${message}`.trim());
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = getDownloadFileName(response, defaultFileName);

  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

function getDownloadFileName(response, defaultFileName) {
  const contentDisposition = response.headers.get("content-disposition") || "";
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);

  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const asciiMatch = contentDisposition.match(/filename="?([^\";]+)"?/i);

  if (asciiMatch?.[1]) {
    return asciiMatch[1];
  }

  return defaultFileName;
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
