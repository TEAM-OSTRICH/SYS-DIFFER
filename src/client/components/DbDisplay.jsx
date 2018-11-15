import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DbDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newColumns: [],
      name: null,
      columns: [],
    };
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    const { tableInfo } = this.props;
    const { name, columns } = tableInfo;
    // console.log(columns,'clm nullable')

    // loop throughh columns to add id to each element
    // id is the same as the text content
    const newColumns = columns.map(column => (
      <li
        className="list-group-item"
        ref={`${name}-${column.name}-${column.dataType}-${column.isNullable ? null : 'NOT NULL'}-${column.constraintTypes
          ? column.constraintTypes.map((constraintType, index) => {
            if (index === column.constraintTypes.length - 1) {
              return constraintType;
            }
            return `${constraintType} `;
          })
          : null}`}
        // ref="hi"
      >
        {column.name}
        {' '}
        {column.dataType}
        {' '}
        {column.isNullable ? null : 'NOT NULL'}
        {' '}
        {column.constraintTypes
          ? column.constraintTypes.map((constraintType, index) => {
            if (index === column.constraintTypes.length - 1) {
              return constraintType;
            }
            return `${constraintType} `;
          })
          : null}
      </li>
    ));

    this.setState({ name, columns, newColumns });

    // console.log(this.state.newColumns, 'newCol');
    // loop through columns again to check which element contains 'REFERENCES'
    // which means it has a foreign key reference

    // for (let i = 0; i < this.state.newColumns.length; i++) {
    //   if (this.state.newColumns[i].ref.includes('REFERENCES')) {
    //     // ReactDOM
    //     //   .findDOMNode(this.refs[`${this.state.newColumns[i].ref}`])
    //     //   .getBoundingClientRect();
    //     // console.log(ReactDOM.findDOMNode(this.refs[`${newColumns[i].ref}`]),
    //     //   'r');
    //   }
    // }
  }

  test() {
    // console.log(ReactDOM.findDOMNode(this.state.newColumns[0].ref));
    const testName = this.state.newColumns[0].ref;
    // console.log(ReactDOM.findDOMNode(this.refs[this.state.newColumns[0].ref]), ':)');
    const node = ReactDOM.findDOMNode(this.refs[testName]);
    console.log(node, ':)');
    console.log(this.state.newColumns, this.state.columns, 'nooo');
    console.log(this.state.newColumns, 'tn', testName);
  }

  render() {
    return (
      <div>
        <ul ref="hi">
          <li className="list-group-item" onClick={this.test}>
            {this.state.name}
          </li>
          {this.state.columns.map(column => (

            <li
              className="list-group-item"
              onClick={this.test}
              ref={`${this.state.name}-${column.name}-${column.dataType}-${column.isNullable ? null : 'NOT NULL'}-${column.constraintTypes
                ? column.constraintTypes.map((constraintType, index) => {
                  if (index === column.constraintTypes.length - 1) {
                    return constraintType;
                  }
                  return `${constraintType} `;
                })
                : null}`}
            >
              {column.name}
              {' '}
              {column.dataType}
              {' '}
              {column.isNullable ? null : 'NOT NULL'}
              {' '}
              {column.constraintTypes
                ? column.constraintTypes.map((constraintType, index) => {
                  if (index === column.constraintTypes.length - 1) {
                    return constraintType;
                  }
                  return `${constraintType} `;
                })
                : null}
            </li>))
        }
        </ul>

      </div>
    );
  }


  // return (

  // );
}

export default DbDisplay;
