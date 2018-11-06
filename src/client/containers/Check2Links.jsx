import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';

const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    // console.log('Connected to database:', cp.database);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    // console.log('Disconnecting from database:', cp.database);
  },
  query(e) {
    // console.log('QUERY:', e.query);
  },
  receive(data, result, e) {
    // console.log('DATA: ', data);
  },
};

const pgp = require('pg-promise')(initOptions);

class Check2Links extends Component {
  constructor(props) {
    super(props);

    this.checkBoth = this.checkBoth.bind(this);
    this.skipThisIsh = this.skipThisIsh.bind(this);
  }

  checkBoth(event) {
    event.preventDefault();

    let input1;
    let input2;

    if (event.target.id === 'notLinks') {
      input1 = `postgres://${this.props.inputObj1User}:${this.props.inputObj1Pass}@${this.props.inputObj1Host}:${this.props.inputObj1Port}/${this.props.inputObj1Dbname}`;
      input2 = `postgres://${this.props.inputObj2User}:${this.props.inputObj2Pass}@${this.props.inputObj2Host}:${this.props.inputObj2Port}/${this.props.inputObj2Dbname}`;
    } else if (event.target.id === 'links') {
      input1 = this.props.input1;
      input2 = this.props.input2;
    }

    const db1 = pgp(input1);
    db1.connect()
      .then((obj) => {
        obj.done(); // success, release the connection;
        return 200;
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        throw error;
      })

      .then((response) => {
        console.log(response, 'ohh');
        if (response === 200) {
          const db2 = pgp(input2);
          db2.connect()
            .then((obj) => {
              obj.done(); // success, release the connection;
              return 200;
            })
            .catch((error) => {
              console.log('ERROR:', error.message || error);
              throw error;
            })
            .then((response) => {
              if (response === 200) {
              // console.log('u1', u1, 'u2', u2);
              // if (u1.length > 0 && u2.length > 0) {
                console.log('work!');
                this.props.history.push('/kevin');
              } else {
                alert('Ge so smart');
              }
            // }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert('Ges mistake');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  skipThisIsh() {
    const { setInput } = this.props;
    setInput(
      'postgres://dslgjgaw:vSOX1FK3PujhRKJSgm3lKL_86UADa2CU@stampy.db.elephantsql.com:5432/dslgjgaw',
      'postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk',
      'public',
      'public',
    );
    this.props.history.push('/kevin');
  }

  render() {
    const {
      input1, input2, inputLinkSchema1, inputLinkSchema2, change1, change2, changeLinkSchema1, changeLinkSchema2, inputObj1User, inputObj1Pass,
      inputObj1Host, inputObj1Schema, inputObj1Port, inputObj1Dbname, inputObj2User, inputObj2Pass, inputObj2Host, inputObj2Port, inputObj2Dbname, inputObj2Schema, changeInput1user, changeInput1pass, changeInput1host, changeInput1port, changeInput1dbname, changeInput1schema, changeInput2user, changeInput2pass, changeInput2host, changeInput2port, changeInput2dbname, changeInput2schema,
    } = this.props;
    const { checkBoth } = this;

    return (
      <div>
        <h1 className="centerText">❤CHRISDIFFER❤</h1>
        <button className="centerText" onClick={this.skipThisIsh}>Skip This Shit</button>
        <h2 className="centerText">PROVIDE LINKS</h2>
        <div className="inputGridContainer">
          <div className="inputGrid">
            <h5>DB 1</h5>
            <br />
            <span>Link 1: </span>
            <input value={input1} onChange={change1} />
            <br />
            <span>Schema: </span>
            <input value={inputLinkSchema1} onChange={changeLinkSchema1} />
          </div>
          <div className="inputGrid">
            <h5>DB 2</h5>
            <br />
            <span>Link 2: </span>
            <input value={input2} onChange={change2} />
            <br />
            <span>Schema: </span>
            <input value={inputLinkSchema2} onChange={changeLinkSchema2} />
          </div>
          <button className="buttonGrid" type="submit" id="links" onClick={checkBoth}>GO</button>
        </div>
        <h2 className="centerText">OR</h2>
        <div className="inputGridContainer">
          <div className="inputGrid">
            <h5>DB 1</h5>
            <br />
            User:
            {' '}
            <input value={inputObj1User} onChange={changeInput1user} />
            <br />
            Password:
            {' '}
            <input value={inputObj1Pass} onChange={changeInput1pass} />
            <br />
            Host:
            {' '}
            <input value={inputObj1Host} onChange={changeInput1host} />
            <br />
            DB Name:
            {' '}
            <input value={inputObj1Dbname} onChange={changeInput1dbname} />
            <br />
            Port:
            {' '}
            <input value={inputObj1Port} onChange={changeInput1port} />
            <br />
            Schema:
            {' '}
            <input value={inputObj1Schema} onChange={changeInput1schema} />
          </div>
          <div className="inputGrid">
            <h5>DB 2</h5>
            <br />
            User:
            {' '}
            <input value={inputObj2User} onChange={changeInput2user} />
            <br />
            Password:
            {' '}
            <input value={inputObj2Pass} onChange={changeInput2pass} />
            <br />
            Host:
            {' '}
            <input value={inputObj2Host} onChange={changeInput2host} />
            <br />
            DB Name:
            {' '}
            <input value={inputObj2Dbname} onChange={changeInput2dbname} />
            <br />
            Port:
            {' '}
            <input value={inputObj2Port} onChange={changeInput2port} />
            <br />
            Schema:
            {' '}
            <input value={inputObj2Schema} onChange={changeInput2schema} />
          </div>
          <button className="buttonGrid" type="submit" id="notLinks" onClick={checkBoth}>GO</button>
        </div>
      </div>
    );
  }
}

// const cn = {
//  host: ‘namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com’,
//  port: 5432,
//  database: ‘namecard’,
//  user: ‘root’,
//  password: ‘12345678’,

// };

// const input1 = ‘postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk’;
// postgres://aajsrbbl:elmer.db.elephantsql.com:5432/aajsrbbl
//  const input2 = postgres://root:12345678@namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com:5432/namecard
//  const input3 = postgres://test:12345678@ostriches.cevlz1oddeme.us-east-2.rds.amazonaws.com:5432/ostrich

// const cn = {
//   host: ‘ostriches.cevlz1oddeme.us-east-2.rds.amazonaws.com’,
//   port: 5432,
//   database: ‘ostrich’,
//   user: ‘test’,
//   password: ‘12345678’,

//  };

export default withRouter(Check2Links);
