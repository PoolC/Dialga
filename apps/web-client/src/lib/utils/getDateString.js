export const getFullCurrentDateString = (time) => {
  const currentDate = time ? new Date(time) : new Date();
  const month =
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const date =
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate();
  return `${currentDate.getFullYear()}-${month}-${date}`;
};

export const getFullCurrentDateTimeString = (time) => {
  const currentDate = time ? new Date(time) : new Date();
  const month =
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const date =
    currentDate.getDate() < 10
      ? `0${currentDate.getDate()}`
      : currentDate.getDate();
  const hour =
    currentDate.getHours() < 10
      ? `0${currentDate.getHours()}`
      : currentDate.getHours();
  const minute =
    currentDate.getMinutes() < 10
      ? `0${currentDate.getMinutes()}`
      : currentDate.getMinutes();
  const second =
    currentDate.getSeconds() < 10
      ? `0${currentDate.getSeconds()}`
      : currentDate.getSeconds();

  return `${currentDate.getFullYear()}-${month}-${date} ${hour}:${minute}:${second}`;
};

export const getHourMinuteString = (timeString) => {
  return timeString.substring(0, 5);
};
