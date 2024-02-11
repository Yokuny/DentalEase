const token = localStorage.getItem("token");

type Method = "GET" | "POST" | "PUT" | "DELETE";
type headersStructure = {
  method: Method;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
  body: string;
  withCredentials: boolean;
};

const FetchConfig = (body: Object, method: Method, auth: Boolean) => {
  const headers: headersStructure = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    withCredentials: true,
  };

  if (auth) {
    headers.headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const POST = (body: Object) => FetchConfig(body, "POST", true);
const PUT = (body: Object) => FetchConfig(body, "PUT", true);
const GET = () => FetchConfig({}, "GET", true);
const DELETE = () => FetchConfig({}, "DELETE", true);
const POST_NO_AUTH = (body: Object) => FetchConfig(body, "POST", false);

export { POST, PUT, GET, DELETE, POST_NO_AUTH };
