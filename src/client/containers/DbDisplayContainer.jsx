import React, { Component } from 'react';
import DbDisplay from '../components/DbDisplay.jsx';

class DbDisplayContainer extends Component {
  /**
   * Draw lines for foreign key relationships and add listen for window resize and scroll.
   */
  componentDidMount() {
    const { drawLines } = this.props;
    drawLines();
    window.addEventListener('resize', drawLines);
    window.addEventListener('scroll', drawLines);
  }

  componentWillUnmount() {
    const { drawLines } = this.props;

    window.removeEventListener('resize', drawLines);
    window.removeEventListener('scroll', drawLines);
  }

  render() {
    const { db } = this.props;
    // console.log(db);
    const tables = db.map(tableInfo => <DbDisplay key={tableInfo.name} tableInfo={tableInfo} />);

    return (
      <div id="dbDisplayContainer">
        {tables}
      </div>
    );
  }
}

export default DbDisplayContainer;
