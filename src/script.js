const electron = require('electron');

const { ipcRenderer } = electron;

ipcRenderer.on('Hi', (event, item) => {
  const scriptTextArea = document.getElementById('scriptTextArea');
  const queries = Object.values(item);
  let queryString = '';

  queries.forEach((query) => {
    queryString += `${query}\n`;
  });

  scriptTextArea.value = queryString;
});
