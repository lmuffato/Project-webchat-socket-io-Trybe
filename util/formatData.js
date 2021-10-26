// src: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript

module.exports = () => {
  const data = new Date();
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // +1 pois no getMonth Janeiro começa com zero.
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
};