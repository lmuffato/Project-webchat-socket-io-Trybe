const createAleatoryUser = () => {
  const name = (Math.random() * 1e16).toString();

  return name;
};

const date = new Date();

const createDate = () => {
  const day = date.getDate();
  const formatedDay = (day.toString().length) === 1 ? `0${day}` : day;

  const month = (date.getMonth() + 1).toString();
  const formatedMonth = (month.length) === 1 ? `0${month}` : month;
  
  const year = date.getFullYear().toString();

  const fullDate = `${formatedDay}-${formatedMonth}-${year}`;

  return fullDate;
};

const createTime = () => {
  let hours = date.getHours();
  const ampm = (hours >= 12) ? 'PM' : 'AM';

  hours %= 12;
  const formatedHours = hours % 12 ? hours : 12;

  const minutes = date.getMinutes();
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const seconds = date.getSeconds();
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const formatedTime = `${formatedHours}:${formatedMinutes}:${formatedSeconds} ${ampm}`;
  return formatedTime;
};

module.exports = {
  createAleatoryUser,
  createDate,
  createTime,
};
