const createDate = (_req, _res) => {
  const rawDate = new Date();
  const dd = String(rawDate.getDate()).padStart(2, '0');
  const mm = String(rawDate.getMonth() + 1).padStart(2, '0'); // Janeiro = 0!
  const yyyy = rawDate.getFullYear();
  const separator1 = '-';

  const date = dd + separator1 + mm + separator1 + yyyy;

  return date;
};

const createTime = (_req, _res) => {
  const rawDate = new Date();
  let hr = String(rawDate.getHours());
  let mn = String(rawDate.getMinutes());
  let sc = String(rawDate.getSeconds());
  const separator2 = ':';

  if (hr < 10) {
    hr = String(rawDate.getHours()).padStart(2, '0');
  }

  if (mn < 10) {
    mn = String(rawDate.getHours()).padStart(2, '0');
  }

  if (sc < 10) {
    sc = String(rawDate.getHours()).padStart(2, '0');
  }

  const time = hr + separator2 + mn + separator2 + sc;

  return time;
};

const consolidateDateAndTime = (_req, _res) => {
  const dateOk = createDate();
  const timeOk = createTime();
  const separator3 = ' ';
  const dateAndTime = dateOk + separator3 + timeOk + separator3;

  return dateAndTime;
};

module.exports = {
  consolidateDateAndTime,
};
