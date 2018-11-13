const storage = require('electron-storage');

const data = {hello:'bye'};
storage.set('./CHRISDIFFER/testFile', data, (err) => {
  if (err) {
    console.error(err,'err')
  } else {
    console.log('saved??')
  }
});
storage.get('./CHRISDIFFER/testFile', (err, data) => {
  if (err) {
    console.error(err,'err in get')
  } else {
    console.log(data,'getback');
  }
});