const electron = require('electron');

const { ipcRenderer } = electron;

ipcRenderer.on('updateScript', (event, script) => {
  const scriptTextArea = document.getElementById('scriptTextArea');
  let queryString = '';

  script.forEach((query) => {
    queryString += `${query.query}\n`;
  });

  scriptTextArea.value = queryString;
});

const addAll = () => {
  ipcRenderer.send('addAll');
};

const removeAll = () => {

};
