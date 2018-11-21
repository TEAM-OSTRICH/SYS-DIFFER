import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import cdf from '../../assets/cdf.svg';

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

    this.state = {
      displayMissing: {
        input1: false,
        inputLinkSchema1: false,
        input2: false,
        inputLinkSchema2: false,
        inputObj1User: false,
        inputObj1Pass: false,
        inputObj1Host: false,
        inputObj1Schema: false,
        inputObj1Port: false,
        inputObj1Dbname: false,
      },
      showRequiredFieldsMsg1: false,
      showRequiredFieldsMsg2: false,
      showConnectionFailedMsg1: false,
      showConnectionFailedMsg2: false,
    };

    this.checkBoth = this.checkBoth.bind(this);
  }

  checkBoth(event) {
    event.preventDefault();

    // Validate user input.
    const { id } = event.target;
    const displayMissing = JSON.parse(JSON.stringify(this.state.displayMissing));

    if (id === 'notLinks') {
      displayMissing.inputObj1User = this.props.inputObj1User === '';
      displayMissing.inputObj1Pass = this.props.inputObj1Pass === '';
      displayMissing.inputObj1Host = this.props.inputObj1Host === '';
      displayMissing.inputObj1Dbname = this.props.inputObj1Dbname === '';
      displayMissing.inputObj1Port = this.props.inputObj1Port === '';
      displayMissing.inputObj1Schema = this.props.inputObj1Schema === '';
      displayMissing.inputObj2User = this.props.inputObj2User === '';
      displayMissing.inputObj2Pass = this.props.inputObj2Pass === '';
      displayMissing.inputObj2Host = this.props.inputObj2Host === '';
      displayMissing.inputObj2Dbname = this.props.inputObj2Dbname === '';
      displayMissing.inputObj2Port = this.props.inputObj2Port === '';
      displayMissing.inputObj2Schema = this.props.inputObj2Schema === '';

      if (
        displayMissing.inputObj1User === true
        || displayMissing.inputObj1Pass === true
        || displayMissing.inputObj1Host === true
        || displayMissing.inputObj1Dbname === true
        || displayMissing.inputObj1Port === true
        || displayMissing.inputObj1Schema === true
        || displayMissing.inputObj2User === true
        || displayMissing.inputObj2Pass === true
        || displayMissing.inputObj2Host === true
        || displayMissing.inputObj2Dbname === true
        || displayMissing.inputObj2Port === true
        || displayMissing.inputObj2Schema === true
      ) {
        this.setState({ displayMissing, showRequiredFieldsMsg2: true });
        return;
      }
    } else if (id === 'links') {
      displayMissing.input1 = this.props.input1 === '';
      displayMissing.inputLinkSchema1 = this.props.inputLinkSchema1 === '';
      displayMissing.input2 = this.props.input2 === '';
      displayMissing.inputLinkSchema2 = this.props.inputLinkSchema2 === '';

      if (
        displayMissing.input1 === true
        || displayMissing.inputLinkSchema1 === true
        || displayMissing.input2 === true
        || displayMissing.inputLinkSchema2 === true
      ) {
        this.setState({ displayMissing, showRequiredFieldsMsg1: true });
        return;
      }
    }

    // Check links.
    let input1;
    let input2;

    if (id === 'notLinks') {
      input1 = `postgres://${this.props.inputObj1User}:${this.props.inputObj1Pass}@${this.props.inputObj1Host}:${this.props.inputObj1Port}/${this.props.inputObj1Dbname}`;
      input2 = `postgres://${this.props.inputObj2User}:${this.props.inputObj2Pass}@${this.props.inputObj2Host}:${this.props.inputObj2Port}/${this.props.inputObj2Dbname}`;
    } else if (id === 'links') {
      input1 = this.props.input1;
      input2 = this.props.input2;
    }

    const db1 = pgp(input1);
    const promise1 = db1.connect()
      .then((obj) => {
        obj.done(); // success, release the connection;
        console.log('inside db1.connect');
        // return 200;
      });
      // .catch(err=>console.log(err, 'nooooo1'));
    const db2 = pgp(input2);
    const promise2 = db2.connect()
      .then((obj) => {
        obj.done(); // success, release the connection;
        console.log('inside db2.connect');
        // return 200;
      });
      // .catch(err=>console.log(err, 'nooooo2'));
    Promise.all([promise1, promise2])
      .then(() => {
        this.props.history.push('/main');
      })
      .catch((err) => {
        console.log(err, 'inside not links connection err');
        if (id === 'notLinks') {
          console.log('this.state.showConnectionFailedMsg2', this.state.showConnectionFailedMsg2);
          this.setState({ showConnectionFailedMsg2: true });
        } else {
          console.log(err, 'inside links connection err');
          console.log('this.state.showConnectionFailedMsg1', this.state.showConnectionFailedMsg1);
          this.setState({ showConnectionFailedMsg1: true });
        }
      });
  }

  render() {
    const {
      input1, input2, inputLinkSchema1, inputLinkSchema2, change1, change2, changeLinkSchema1, changeLinkSchema2, inputObj1User, inputObj1Pass,
      inputObj1Host, inputObj1Schema, inputObj1Port, inputObj1Dbname, inputObj2User, inputObj2Pass, inputObj2Host, inputObj2Port, inputObj2Dbname, inputObj2Schema, changeInput1user, changeInput1pass, changeInput1host, changeInput1port, changeInput1dbname, changeInput1schema, changeInput2user, changeInput2pass, changeInput2host, changeInput2port, changeInput2dbname, changeInput2schema,
    } = this.props;
    const {
      displayMissing, showRequiredFieldsMsg1, showRequiredFieldsMsg2, showConnectionFailedMsg1, showConnectionFailedMsg2,
    } = this.state;
    const { checkBoth } = this;

    return (
      <div>
        
        <h1 className="centerText">CHRISDIFFER</h1>
        <img src={cdf} className="logo" />
     
        <h2 className="centerText">PROVIDE LINKS</h2>
        <div className="inputGridContainer">
          <div className="inputGrid">
            <h5>Source DB</h5>
            <br />
            <span className="homePageFields">Link 1: </span>
            <input value={input1} onChange={change1} />
            {' '}
            <span style={{ visibility: displayMissing.input1 ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">Schema: </span>
            <input value={inputLinkSchema1} onChange={changeLinkSchema1} />
            {' '}
            <span style={{ visibility: displayMissing.inputLinkSchema1 ? 'visible' : 'hidden' }}>◀</span>
          </div>
          <div className="inputGrid">
            <h5>Target DB</h5>
            <br />
            <span className="homePageFields">Link 2: </span>
            <input value={input2} onChange={change2} />
            {' '}
            <span style={{ visibility: displayMissing.input2 ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">Schema: </span>
            <input value={inputLinkSchema2} onChange={changeLinkSchema2} />
            {' '}
            <span style={{ visibility: displayMissing.link2Scehma ? 'visible' : 'hidden' }}>◀</span>
          </div>
          <p className="missing-fields-msg" style={{ display: showRequiredFieldsMsg1 ? 'block' : 'none' }}>Please enter the required fields.</p>
          <p className="connection-failed-msg" style={{ display: showConnectionFailedMsg1 ? 'block' : 'none' }}>Could not connect to database.</p>
          <button className="buttonGrid" type="submit" id="links" onClick={checkBoth}>GO</button>
        </div>
        <h2 className="centerText">OR</h2>
        <div className="inputGridContainer">
          <div className="inputGrid">
            <h5>Source DB</h5>
            <br />
            <span className="homePageFields">

            Username:
            </span>
            {' '}
            <input value={inputObj1User} onChange={changeInput1user} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1User ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">

            Password:
            </span>
            {' '}
            <input value={inputObj1Pass} onChange={changeInput1pass} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1Pass ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Host:
            </span>
            {' '}
            <input value={inputObj1Host} onChange={changeInput1host} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1Host ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            DB Name:
            </span>
            {' '}
            <input value={inputObj1Dbname} onChange={changeInput1dbname} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1Dbname ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Port:
            </span>
            {' '}
            <input value={inputObj1Port} onChange={changeInput1port} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1Port ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Schema:
            </span>
            {' '}
            <input value={inputObj1Schema} onChange={changeInput1schema} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj1Schema ? 'visible' : 'hidden' }}>◀</span>
          </div>
          <div className="inputGrid">
            <h5>Target DB</h5>
            <br />
            <span className="homePageFields">
            Username:
            </span>
            {' '}
            <input value={inputObj2User} onChange={changeInput2user} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2User ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Password:
            </span>
            {' '}
            <input value={inputObj2Pass} onChange={changeInput2pass} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2Pass ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Host:
            </span>
            {' '}
            <input value={inputObj2Host} onChange={changeInput2host} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2Host ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            DB Name:
            </span>
            {' '}
            <input value={inputObj2Dbname} onChange={changeInput2dbname} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2Dbname ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Port:
            </span>
            {' '}
            <input value={inputObj2Port} onChange={changeInput2port} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2Port ? 'visible' : 'hidden' }}>◀</span>
            <br />
            <span className="homePageFields">
            Schema:
            </span>
            {' '}
            <input value={inputObj2Schema} onChange={changeInput2schema} />
            {' '}
            <span style={{ visibility: displayMissing.inputObj2Schema ? 'visible' : 'hidden' }}>◀</span>
          </div>
          <p className="missing-fields-msg" style={{ display: showRequiredFieldsMsg2 ? 'block' : 'none' }}>Please enter the required fields.</p>
          <p className="connection-failed-msg" style={{ display: showConnectionFailedMsg2 ? 'block' : 'none' }}>Could not connect to database.</p>
          <button className="buttonGrid" type="submit" id="notLinks" onClick={checkBoth}>GO</button>
        </div>
      </div>
    );
  }
}


export default withRouter(Check2Links);
