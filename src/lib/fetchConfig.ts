type Method = "GET" | "POST" | "PUT" | "DELETE";
type headersStructure = {
  method: Method;
  headers: { "Content-Type": string; Authorization: string };
  body?: string;
  withCredentials: boolean;
};

const FetchConfig = (body: Object, method: Method) => {
  const headers: headersStructure = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
    body: JSON.stringify(body),
  };

  if (method === "GET" || method === "DELETE") delete headers.body;

  return headers;
};

const POST = (body: Object) => FetchConfig(body, "POST");
const PUT = (body: Object) => FetchConfig(body, "PUT");
const GET = () => FetchConfig({}, "GET");
const DELETE = () => FetchConfig({}, "DELETE");

export { POST, PUT, GET, DELETE };
