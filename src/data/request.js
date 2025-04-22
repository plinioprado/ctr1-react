export async function get(url) {
  let data = null;
  let format = null;
  if (url === "users") {
    data = get_users_data();
    format = get_users_format();
  } else if (url === "settings") {
    data = get_settings_data();
    format = get_settings_format();
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

function get_settings_data() {
  return [
    {
      key: "entity_id",
      val: "test",
    },
    {
      key: "entity_name",
      val: "Example Test Ltd.",
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
        name: "val",
        label: "Value",
      },
    ],
  };
}

function get_users_data() {
  return [
    {
      email: "john.doe@example.com",
      name: "John Doe",
      pass: "12345",
    },
    {
      email: "jane.doe@example.com",
      name: "Jane Doe",
      pass: "12345",
    },
  ];
}

function get_users_format() {
  return {
    header: "Users",
    columns: [
      {
        name: "email",
        label: "Email",
        primary: true,
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
