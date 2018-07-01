const keyRoot = 'bears-team-32';

const getItems = type => {
  return JSON.parse(localStorage.getItem(keys[type])) || [];
};

const setItems = (type, items) => {
  localStorage.setItem(keys[type], JSON.stringify(items));
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
};
