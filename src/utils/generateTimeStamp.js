module.exports = () => {
  const d = new Date();
  const fullDate = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  return `${fullDate} ${time}`;
};