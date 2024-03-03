export const extractData = (data: Date, format: string) => {
  const date = new Date(data);

  const padStart = (value: number) => String(value).padStart(2, "0");

  const hour = padStart(date.getHours());
  const minute = padStart(date.getMinutes());
  const second = padStart(date.getSeconds());
  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);

  const dayAndMonth = `${day}/${month}`;
  const hourAndMinute = `${hour}:${minute}`;

  switch (format) {
    case "hour":
      return `${hourAndMinute}`;
    case "full":
      return `${dayAndMonth}/${date.getFullYear()} ${hourAndMinute}:${second}`;
    default:
      return `${dayAndMonth} ${hourAndMinute}`;
  }
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
