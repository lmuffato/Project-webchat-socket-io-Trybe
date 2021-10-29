module.exports = () =>
  (
    Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15)
  ).substring(0, 16);
