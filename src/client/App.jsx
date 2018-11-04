import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import Check2Links from './containers/Check2Links.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // u1: '',
      // u2: '',
      input1: '',
      input2: '',
      inputObj1User: '',
      inputObj1Pass: '',
      inputObj1Host: '',
      inputObj1Port: '',
      inputObj1Dbname: '',
      inputObj2User: '',
      inputObj2Pass: '',
      inputObj2Host: '',
      inputObj2Port: '',
      inputObj2Dbname: '',
    };

    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    this.changeInput1user = this.changeInput1user.bind(this);
    this.changeInput1pass = this.changeInput1pass.bind(this);
    this.changeInput1host = this.changeInput1host.bind(this);
    this.changeInput1port = this.changeInput1port.bind(this);
    this.changeInput1dbname = this.changeInput1dbname.bind(this);
    this.changeInput2user = this.changeInput2user.bind(this);
    this.changeInput2pass = this.changeInput2pass.bind(this);
    this.changeInput2host = this.changeInput2host.bind(this);
    this.changeInput2port = this.changeInput2port.bind(this);
    this.changeInput2dbname = this.changeInput2dbname.bind(this);

  }

  change1(event) {
    this.setState({ input1: event.target.value });
  }

  change2(event) {
    this.setState({ input2: event.target.value });
  }

  changeInput1user(event) {
    console.log(event,'no')
    this.setState({ 
      inputObj1User: event.target.value,
      input1: '',
      input2: '' });
  }
  changeInput1pass(event) {
    this.setState({ 
      inputObj1Pass: event.target.value,
      input1: '',
      input2: '' });
  }
  changeInput1host(event) {
    this.setState({ 
      inputObj1Host: event.target.value,
      input1: '',
      input2: '' });
  }
  changeInput1port(event) {
    this.setState({ 
      inputObj1Port: event.target.value,
      input1: '',
      input2: '' });
  }
  changeInput1dbname(event) {
    this.setState({ 
      inputObj1Dbname: event.target.value,
      input1: '',
      input2: '' });
  }
  
  changeInput2user(event) {
    this.setState({ 
      inputObj2User: event.target.value,
      input1: '',
      input2: '' });
  }
  changeInput2pass(event) {
    this.setState({ inputObj2Pass: event.target.value,
    input1: '',
    input2: '' });
  }
  changeInput2host(event) {
    this.setState({ inputObj2Host: event.target.value,
    input1: '',
    input2: '' });
  }
  changeInput2port(event) {
    this.setState({ inputObj2Port: event.target.value,
    input1: '',
    input2: '' });
  }
  changeInput2dbname(event) {
    this.setState({ inputObj2Dbname: event.target.value,
    input1: '',
    input2: '' });
  }
  

  render() {
    const {
      input1, input2, inputObj1User, inputObj1Pass,
inputObj1Host,  inputObj1Port,  inputObj1Dbname,  inputObj2User,  inputObj2Pass,  inputObj2Host,  inputObj2Port,  inputObj2Dbname,
    } = this.state;
    const {
      checkBoth, change1, change2, changeInput1user,changeInput1pass, changeInput1host, changeInput1port, changeInput1dbname, changeInput2user, changeInput2pass, changeInput2host, changeInput2port, changeInput2dbname,
    } = this;

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/kevin"
              render={
                props => (
                  <MainContainer
                    {...props}
                    input1={input1}
                    input2={input2}
                    inputObj1User={inputObj1User}
                    inputObj1Pass={inputObj1Pass}
                    inputObj1Host={inputObj1Host}
                    inputObj1Port={inputObj1Port}
                    inputObj1Dbname={inputObj1Dbname}
                    inputObj2User={inputObj2User}
                    inputObj2Pass={inputObj2Pass}
                    inputObj2Host={inputObj2Host}
                    inputObj2Port={inputObj2Port}
                    inputObj2Dbname={inputObj2Dbname}
                  />
                )
              }
            />
            <Route
              path="/"
              render={
                props => (
                  <Check2Links
                    {...props}
                    // u1={u1}
                    // u2={u2}
                    input1={input1}
                    input2={input2}
                    inputObj1User={inputObj1User}
                    inputObj1Pass={inputObj1Pass}
                    inputObj1Host={inputObj1Host}
                    inputObj1Port={inputObj1Port}
                    inputObj1Dbname={inputObj1Dbname}
                    inputObj2User={inputObj2User}
                    inputObj2Pass={inputObj2Pass}
                    inputObj2Host={inputObj2Host}
                    inputObj2Port={inputObj2Port}
                    inputObj2Dbname={inputObj2Dbname}
                    checkBoth={checkBoth}
                    change1={change1}
                    change2={change2}
                    changeInput1user={changeInput1user}
                    changeInput1pass={changeInput1pass}
                    changeInput1host={changeInput1host}
                    changeInput1port={changeInput1port}
                    changeInput1dbname={changeInput1dbname}
                    changeInput2user={changeInput2user}
                    changeInput2pass={changeInput2pass}
                    changeInput2host={changeInput2host}
                    changeInput2port={changeInput2port}
                    changeInput2dbname={changeInput2dbname}
                    

                  />
                )
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
      // <div>
      //   <MainContainer />
      //   <Check2Links />
      // </div>
    );
  }
}

export default App;
