type Method = "GET" | "POST" | "PUT" | "DELETE";
type headersStructure = {
  method: Method;
  headers: { "Content-Type": string };
  body: string;
  withCredentials: boolean;
};

const FetchConfig = (body: Object, method: Method) => {
  const headers: headersStructure = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    body: JSON.stringify(body),
  };

  return headers;
};

const POST = (body: Object) => FetchConfig(body, "POST");
const PUT = (body: Object) => FetchConfig(body, "PUT");
const GET = () => FetchConfig({}, "GET");
const DELETE = () => FetchConfig({}, "DELETE");

export { POST, PUT, GET, DELETE };
