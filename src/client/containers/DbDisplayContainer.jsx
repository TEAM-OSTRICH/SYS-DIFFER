import React, { Component } from 'react';
import DbDisplay from '../components/DbDisplay.jsx';

class DbDisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRefs: [],
    };
  }


  componentDidMount() {
    const { db } = this.props;
    const arrTest = this.state.allRefs.slice();
    db.forEach(ele => {
      // console.log(ele,'ele')
      // ele.props.tableInfo.columns.forEach(e=>arrTest.push(e))
    });
    // console.log(db, 'pray');
  }

  render() {
    const { db } = this.props;
    const tables = db.map(tableInfo => <DbDisplay key={tableInfo.name} tableInfo={tableInfo} ref={tableInfo.name} />);
    // const arrTest = this.state.allRefs.slice();
    // db.forEach(ele => {
    //   console.log(arrTest,'TT',ele)
    //   ele.columns.forEach(e=>arrTest.push(e))
    // });
    // console.log(tables, 'tables2');
    return (
      <div id="dbDisplayContainer">
        {tables}
      </div>
    );
  }

  // return (
  //   <div id="dbDisplayContainer">
  //     {tables}
  //   </div>
  // );
}

export default DbDisplayContainer;
