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
  }

  checkBoth(event) {
    event.preventDefault();
    // console.log(this.props);
    const {
      input1, input2, u1, u2, updateU1, updateU2,
    } = this.props;
    // part1
    // fetch('/check1', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json; charset=utf-8' },
    //   body: JSON.stringify({
    //     test: input1,
    //   }),
    // })
    const db1 = pgp(input1);
    db1.connect()
      .then((obj) => {
        // u1 = req.body.test;
        // console.log(u1, 'u1');
        // res.json(u1);
        obj.done(); // success, release the connection;
        return 200;
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        throw error;
      })
      // .then(data => data.json())
      // .then(data => updateU1(data))
      .then((response) => {
        console.log(response,'ohh');
        if (response === 200) {
        // part2
          // fetch('/check2', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json; charset=utf-8' },
          //   body: JSON.stringify({
          //     test: input2,
          //   }),
          // })

          // .then(data => data.json())
          // .then(data => updateU2(data))
          // .then(() => console.log(this.state))

          // original button function

          const db2 = pgp(input2);
    db2.connect()
      .then((obj) => {
        // u1 = req.body.test;
        // console.log(u1, 'u1');
        // res.json(u1);
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

  render() {
    const {
      input1, input2, change1, change2,
    } = this.props;
    const { checkBoth } = this;
    

    
    return (
      <div>
        <h1>DBiffer</h1>

        <form>
          <span>link1: </span><input id="DbUrl1" value={input1} onChange={change1} />
          {/* <br />
          <br /> */}
          <span>link2: </span><input id="DbUrl2" value={input2} onChange={change2} />
          <br />
          <br />
          <button type="submit" onClick={checkBoth}>GO</button>
          {/* <NavLink to="/kevin"><button>kevin</button></NavLink> */}
          {/* <button type="button"><NavLink to="/kevin2"> kevin </NavLink></button> */}
        </form>
        <h2>OR</h2>
        <form>
          db1<br></br>
          <input value="username"/>
          <input value="password"/>
          <input value="host"/>
          <input value="dbname"/>
          <input value="port"/>

          <br></br>
          db2<br></br>
          <input value="username"/>
          <input value="password"/>
          <input value="host"/>
          <input value="dbname"/>
          <input value="port"/>

          <br></br>
          <button type="submit">gooo</button>
          {/* <NavLink to="/kevin"><button>kevin</button></NavLink> */}
          {/* <button type="button"><NavLink to="/kevin2"> kevin </NavLink></button> */}
        </form>

        
      </div>
    );
  }
}

//const cn = {
//  host: ‘namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com’,
//  port: 5432,
//  database: ‘namecard’,
//  user: ‘root’,
//  password: ‘12345678’,

// };


// const input1 = ‘postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk’;
//  const input2 = postgres://root:12345678@namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com:5432/namecard
export default withRouter(Check2Links);
