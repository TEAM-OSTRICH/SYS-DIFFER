import React, { Component } from 'react';

// added function to change clicked element's background color
const handleClick = (event) => {
  console.log('hey',event.target.style.borderColor);
  
  // below is not correct!
  // if click on just a little part, not the whole list,
  if (event.target.parentNode.tagName === 'LI' && event.target.style.borderColor !== 'yellow') {
    event.target.parentNode.style.background = 'purple'
  // if click on the list, just turn list purple
  } else if (event.target.parentNode.tagName === 'UL' || event.target.style.borderColor === 'yellow'){
    event.target.style.background = 'purple';
  }
  
}
const DiffDbDisplay = (props) => {
  const { tableInfo, diffDbColors } = props;
  const { name, columns } = tableInfo;
  return (
    <ul className="list-group-item" style={{ borderColor: diffDbColors[name] ? diffDbColors[name] : 'rgba(0,0,0,.125)' }} onClick={diffDbColors[name]?handleClick:null}>
      <li className="list-group-item">
        {name}
      </li>
      {columns.map(column => (
        <li className="list-group-item" style={{ borderColor: diffDbColors[`${name}-${column.name}`] ? diffDbColors[`${name}-${column.name}`] : 'rgba(0,0,0,.125)' }} onClick={diffDbColors[`${name}-${column.name}`]?handleClick:null}>
          <span>{column.name}</span>
          {' '}
          <span className="column-property" style={{ borderColor: diffDbColors[`${name}-${column.name}-${column.dataType}`] ? diffDbColors[`${name}-${column.name}-${column.dataType}`] : 'rgba(0,0,0,.125)' }} onClick={diffDbColors[`${name}-${column.name}-${column.dataType}`]?handleClick:null}>{column.dataType}</span>
          {' '}
          {column.constraintType ? <span className="column-property" style={{ borderColor: diffDbColors[`${name}-${column.name}-${column.constraintType}`] ? diffDbColors[`${name}-${column.name}-${column.constraintType}`] : 'rgba(0,0,0,.125)' }} onClick={diffDbColors[`${name}-${column.name}-${column.constraintType}`]?handleClick:null}>{column.constraintType}</span> : null}
        </li>))
      }
    </ul>
  );
};

export default DiffDbDisplay;
