import _ from 'lodash';
// import handleClick from './HandleClick';

const selectAll = (db, diffDbColors, addScript, backgroundColors, setBackgroundColor, addAllChanges) => {
  const ids = Object.keys(diffDbColors);
  const script = [];
  // console.log(backgroundColors);
  // Loop through all ids of backgroundColors and select changes.

  ids.forEach((id) => {
    const idArray = id.split('-');
    const tableName = idArray[0];
    const foundTable = _.find(db, { name: tableName });

    if (idArray.length === 1) {
      script.push({ id, query: handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable) });
    } else {
      const columnName = idArray[1];
      const foundColumn = _.find(foundTable.columns, { name: columnName });
      script.push({ id, query: handleClick(id, diffDbColors, addScript, setBackgroundColor, foundTable, foundColumn) });
    }
  });

  addAllChanges(script);
};

export default selectAll;
