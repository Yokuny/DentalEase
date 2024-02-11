const extractData = (format: string, data: Date) => {
  const date = new Date(data);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let formattedHour;
  switch (format) {
    case "hour":
      formattedHour = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      break;
    case "hourDate":
      formattedHour = `${date.getDate()}/${date.getMonth() + 1} 
      ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      break;
    case "full":
      formattedHour = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} 
      ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
      break;
    default:
      formattedHour = `${date.getDate()}/${date.getMonth() + 1} ${hour}:${minute}`;
      break;
  }

  return formattedHour;
};

export default extractData;
