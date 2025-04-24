export async function get(url) {
  let data = null;
  let format = null;
  if (url === "users") {
    data = get_users_data();
    format = get_users_format();
  } else if (url.startsWith("users/")) {
    const id = url.split("/")[1];
    data = get_user_data(id);
    format = get_user_format();
  } else if (url === "settings") {
    data = get_settings_data();
    format = get_settings_format();
  } else if (url.startsWith("settings/")) {
    const id = url.split("/")[1];
    data = get_setting_data(id);
    format = get_setting_format();
  } else {
    throw new Error("Invalid URL");
  }

  return {
    status: 200,
    data: data,
    format: format,
    message: "ok",
  };
}

export async function post(qPath, api_key, data) {
  const url = `http://localhost:8000/${qPath}`;
  const result = await doRequest(url, "POST", api_key, data);
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
    throw new Error(`Invalid response status: ${response.status}`);
  }

  const json = await response.json();

  return json;
};

// Mock data

function get_settings_data() {
  return [
    {
      key: "entity_id",
      value: "test",
    },
    {
      key: "entity_name",
      value: "Example Test Ltd.",
    },
  ];
}

function get_settings_format() {
  return {
    header: "Settings",
    columns: [
      {
        name: "key",
        label: "Key",
        primary: true,
      },
      {
        name: "value",
        label: "Value",
      },
    ],
  };
}

function get_setting_data(id) {
  const list = get_settings_data();
  const item = list.find((item) => item.key === id);
  if (!item) {
    throw new Error("Item not found");
  }
  return item;
}

function get_setting_format() {
  return {
    header: "Setting",
    fields: [
      {
        name: "key",
        label: "Key",
        type: "text",
        size: 6,
        primary: true,
      },
      {
        name: "value",
        label: "Value",
        type: "text",
        size: 6,
      },
    ],
  };
}

function get_users_data() {
  return [
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      pass: "12345",
      birthday: "1990-01-31",
    },
    {
      id: 2,
      email: "jane.doe@example.com",
      name: "Jane Doe",
      pass: "12345",
      birthday: "1991-02-30",
    },
  ];
}

function get_users_format() {
  return {
    header: "Users",
    columns: [
      {
        name: "id",
        label: "Id",
        primary: true,
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "name",
        label: "Name",
      },
      {
        name: "pass",
        label: "Password",
      },
    ],
  };
}

function get_user_data(id) {
  const list = get_users_data();
  const item = list.find((item) => item.id.toString() === id.toString());
  if (!item) {
    throw new Error("Item not found");
  }
  return item;
}

function get_user_format() {
  return {
    header: "User",
    fields: [
      {
        name: "id",
        label: "Id",
        type: "integer",
        primary: true,
        size: 2,
      },
      {
        name: "name",
        label: "Name",
        type: "text",
        size: 10,
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        size: 6,
      },

      {
        name: "pass",
        label: "Pass",
        type: "text",
        size: 6,
      },
      {
        name: "birthday",
        label: "Birthday",
        type: "date",
        size: 3,
      },
    ],
  };
}
