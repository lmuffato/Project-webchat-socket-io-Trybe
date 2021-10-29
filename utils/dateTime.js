module.exports = () => {
  const currentDate = new Date();
  const date = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear()).padStart(2, '0');
  
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return {
    fulldate: `${date}-${month}-${year}`,
    fulltime: `${hours}:${minutes}:${seconds}`,
  };
};
