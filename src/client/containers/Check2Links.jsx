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
    console.log(event.target.id, "BUTTON ID");
    let input1;
    let input2;
    if (event.target.id === "notLinks") {
      input1 = `postgres://${this.props.inputObj1User}:${this.props.inputObj1Pass}@${this.props.inputObj1Host}:${this.props.inputObj1Port}/${this.props.inputObj1Dbname}`;
      input2 = `postgres://${this.props.inputObj2User}:${this.props.inputObj2Pass}@${this.props.inputObj2Host}:${this.props.inputObj2Port}/${this.props.inputObj2Dbname}`
    }
    
    else if (event.target.id === "links"){
      input1 = this.props.input1;
      input2 = this.props.input2;
    } 
    console.log(input1, input2, 'NOTHING?')
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
        console.log(response,'ohh');
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

  render() {
    const {
      input1, input2, change1, change2,inputObj1User, inputObj1Pass,
      inputObj1Host,  inputObj1Port,  inputObj1Dbname,  inputObj2User,  inputObj2Pass,  inputObj2Host,  inputObj2Port,  inputObj2Dbname,changeInput1user,changeInput1pass, changeInput1host, changeInput1port, changeInput1dbname, changeInput2user, changeInput2pass, changeInput2host, changeInput2port, changeInput2dbname,
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
          <button type="submit" id="links" onClick={checkBoth}>GO</button>
        </form>
        <h2>OR</h2>
        <form>
          db1<br></br>
          user<input id="inp1-1" value={inputObj1User} onChange={changeInput1user}/>
          pass<input id="inp1-2" value={inputObj1Pass} onChange={changeInput1pass}/>
          host<input id="inp1-3" value={inputObj1Host} onChange={changeInput1host}/>
          dbname<input id="inp1-4" value={inputObj1Dbname} onChange={changeInput1dbname}/>
          port<input id="inp1-5" value={inputObj1Port} onChange={changeInput1port}/>

          <br></br>
          db2<br></br>
          user<input id="inp2-1" value={inputObj2User} onChange={changeInput2user}/>
          pass<input id="inp2-2" value={inputObj2Pass} onChange={changeInput2pass}/>
          host<input id="inp2-3" value={inputObj2Host} onChange={changeInput2host}/>
          dbname<input id="inp2-4" value={inputObj2Dbname} onChange={changeInput2dbname}/>
          port<input id="inp2-5" value={inputObj2Port} onChange={changeInput2port}/>

          <br></br>
          <button type="submit" id="notLinks" onClick={checkBoth}>gooo</button>
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
//postgres://aajsrbbl:elmer.db.elephantsql.com:5432/aajsrbbl
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
