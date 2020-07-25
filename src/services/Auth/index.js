import config from "../../configs/config";

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

export const signIn = async (mnemonic, inviteId) => {
  const resp = await fetch(`${config.url}/users/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ mnemonic, inviter_id: inviteId }),
  });
  const json = await resp.json();
  if (json.status === "user was saved" && json.token) {
    console.log(json);
    localStorage.setItem("token", json.token);
    return true;
  } else {
    return false;
  }
};
