module.exports = () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return {
    fulldate: `${date}-${month}-${year}`,
    fulltime: `${hours}:${minutes}:${seconds}`,
  };
};
