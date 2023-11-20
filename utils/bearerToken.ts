import Cookie from "js-cookie";

const token = Cookie.get("auth_token");

const bearerToken = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default bearerToken;