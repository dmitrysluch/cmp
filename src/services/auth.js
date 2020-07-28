import config from "../configs/config";

export const getMnemonic = async () => {
  const resp = await fetch(`${config.url}/users/get_mnemonic/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const json = await resp.json();
  return json;
};

export const signIn = async (mnemonic) => {
  const resp = await fetch(`${config.url}/users/log_in/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ mnemonic }),
  });
  const json = await resp.json();
  if (json.token) {
    console.log(json);
    localStorage.setItem("token", json.token);
    return json;
  } else {
    return false;
  }
};

export const signUp = async (mnemonic) => {
  const resp = await fetch(`${config.url}/users/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ mnemonic }),
  });
  const json = await resp.json();
  if (json.status === "user was saved" && json.token) {
    console.log(json);
    localStorage.setItem("token", json.token);
    return json;
  } else {
    return false;
  }
};
