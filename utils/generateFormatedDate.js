const generateFormatedDate = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${day < 10 ? `0${day}` : day}-${
    month < 10 ? `0${month}` : month
  }-${year} ${hour}:${minute}:${second}`;
};

module.exports = generateFormatedDate;
