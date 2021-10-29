async function fetchMessages(url) {
  const messages = fetch(url).then((data) => data.json());
  return messages;
}

export default fetchMessages;