const keyRoot = 'bears-team-32';

const getItems = type => {
  return JSON.parse(localStorage.getItem(keys[type])) || [];
};

const setItem = (type, newItem) => {
  let items = getItems(type);
  const existItem = items.filter(item => item.id === newItem.id);
  existItem.length === 0 && items.push(newItem);
  localStorage.setItem(keys[type], JSON.stringify(items));
};
const setItems = (type, newItems) => {
  localStorage.setItem(keys[type], JSON.stringify(newItems));
};

const keys = {
  recent: `${keyRoot}_recent`,
  playlist: `${keyRoot}_playlist`,
  album: `${keyRoot}_album`,
  artist: `${keyRoot}_artist`,
  track: `${keyRoot}_track`,
};

export default {
  ...keys,
  getItems,
  setItems,
  setItem,
};
