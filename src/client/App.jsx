import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import Check2Links from './containers/Check2Links.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the top two links on entry page
      // input1: 'postgres://qycgeurz:EWz1OdxTyn2M3QpeC_RYlycDSjLlVSZp@pellefant.db.elephantsql.com:5432/qycgeurz',
      // input2: 'postgres://aafcjjpk:kRa120MMxvgg_eahaRY4dnjeHKmS_jvh@stampy.db.elephantsql.com:5432/aafcjjpk',
      // New
      input1: 'postgres://raluwdpv:qALK00g6KMhzqhaghnqyUuXNlhxZBTAB@baasu.db.elephantsql.com:5432/raluwdpv',
      input2: 'postgres://klznohkc:DfZb09yicbdwT-YJ8ntHkCIt4tF5v7ci@baasu.db.elephantsql.com:5432/klznohkc',
      inputLinkSchema1: 'public',
      inputLinkSchema2: 'public',

      // use these to create links (bottom of entry page)
      inputObj1User: '',
      inputObj1Pass: '',
      inputObj1Host: '',
      inputObj1Port: '',
      inputObj1Dbname: '',
      inputObj1Schema: 'public',
      inputObj2User: '',
      inputObj2Pass: '',
      inputObj2Host: '',
      inputObj2Port: '',
      inputObj2Dbname: '',
      inputObj2Schema: 'public',
    };

    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    this.changeInput1user = this.changeInput1user.bind(this);
    this.changeInput1pass = this.changeInput1pass.bind(this);
    this.changeInput1host = this.changeInput1host.bind(this);
    this.changeInput1port = this.changeInput1port.bind(this);
    this.changeInput1dbname = this.changeInput1dbname.bind(this);
    this.changeInput1schema = this.changeInput1schema.bind(this);

    this.changeInput2user = this.changeInput2user.bind(this);
    this.changeInput2pass = this.changeInput2pass.bind(this);
    this.changeInput2host = this.changeInput2host.bind(this);
    this.changeInput2port = this.changeInput2port.bind(this);
    this.changeInput2dbname = this.changeInput2dbname.bind(this);
    this.changeInput2schema = this.changeInput2schema.bind(this);

    this.changeLinkSchema1 = this.changeLinkSchema1.bind(this);
    this.changeLinkSchema2 = this.changeLinkSchema2.bind(this);
  }

  // update state to most recent entries
  change1(event) {
    this.setState({ input1: event.target.value });
  }

  change2(event) {
    this.setState({ input2: event.target.value });
  }

  changeLinkSchema1(event) {
    this.setState({ inputLinkSchema1: event.target.value });
  }

  changeLinkSchema2(event) {
    this.setState({ inputLinkSchema2: event.target.value });
  }

  // for functions below also clear inputs from first two inputs if user enters info in bottom input windows
  changeInput1user(event) {
    this.setState({
      inputObj1User: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput1pass(event) {
    this.setState({
      inputObj1Pass: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput1host(event) {
    this.setState({
      inputObj1Host: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput1port(event) {
    this.setState({
      inputObj1Port: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput1dbname(event) {
    this.setState({
      inputObj1Dbname: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput1schema(event) {
    this.setState({
      inputObj1Schema: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2user(event) {
    this.setState({
      inputObj2User: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2pass(event) {
    this.setState({
      inputObj2Pass: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2host(event) {
    this.setState({
      inputObj2Host: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2port(event) {
    this.setState({
      inputObj2Port: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2dbname(event) {
    this.setState({
      inputObj2Dbname: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  changeInput2schema(event) {
    this.setState({
      inputObj2Schema: event.target.value,
      input1: '',
      input2: '',
      // inputLinkSchema1: '',
      // inputLinkSchema2: '',
    });
  }

  render() {
    const {
      input1, input2, inputLinkSchema1, inputLinkSchema2, inputObj1User, inputObj1Pass,
      inputObj1Host, inputObj1Port, inputObj1Dbname, inputObj1Schema, inputObj2User, inputObj2Pass, inputObj2Host, inputObj2Port, inputObj2Dbname, inputObj2Schema,
    } = this.state;
    const {
      checkBoth, change1, change2, changeLinkSchema1, changeLinkSchema2, changeInput1user, changeInput1pass, changeInput1host, changeInput1port, changeInput1dbname, changeInput1schema, changeInput2user, changeInput2pass, changeInput2host, changeInput2port, changeInput2dbname, changeInput2schema, setInput,
    } = this;

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/main"
              render={
                props => (
                  <MainContainer
                    {...props}
                    input1={input1}
                    input2={input2}
                    inputLinkSchema1={inputLinkSchema1}
                    inputLinkSchema2={inputLinkSchema2}

                    inputObj1User={inputObj1User}
                    inputObj1Pass={inputObj1Pass}
                    inputObj1Host={inputObj1Host}
                    inputObj1Port={inputObj1Port}
                    inputObj1Dbname={inputObj1Dbname}
                    inputObj1Schema={inputObj1Schema}

                    inputObj2User={inputObj2User}
                    inputObj2Pass={inputObj2Pass}
                    inputObj2Host={inputObj2Host}
                    inputObj2Port={inputObj2Port}
                    inputObj2Dbname={inputObj2Dbname}
                    inputObj2Schema={inputObj2Schema}
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
                    input1={input1}
                    input2={input2}
                    inputLinkSchema1={inputLinkSchema1}
                    inputLinkSchema2={inputLinkSchema2}

                    inputObj1User={inputObj1User}
                    inputObj1Pass={inputObj1Pass}
                    inputObj1Host={inputObj1Host}
                    inputObj1Port={inputObj1Port}
                    inputObj1Dbname={inputObj1Dbname}
                    inputObj1Schema={inputObj1Schema}

                    inputObj2User={inputObj2User}
                    inputObj2Pass={inputObj2Pass}
                    inputObj2Host={inputObj2Host}
                    inputObj2Port={inputObj2Port}
                    inputObj2Dbname={inputObj2Dbname}
                    inputObj2Schema={inputObj2Schema}

                    checkBoth={checkBoth}
                    change1={change1}
                    change2={change2}
                    changeLinkSchema1={changeLinkSchema1}
                    changeLinkSchema2={changeLinkSchema2}

                    changeInput1user={changeInput1user}
                    changeInput1pass={changeInput1pass}
                    changeInput1host={changeInput1host}
                    changeInput1port={changeInput1port}
                    changeInput1dbname={changeInput1dbname}
                    changeInput1schema={changeInput1schema}

                    changeInput2user={changeInput2user}
                    changeInput2pass={changeInput2pass}
                    changeInput2host={changeInput2host}
                    changeInput2port={changeInput2port}
                    changeInput2dbname={changeInput2dbname}
                    changeInput2schema={changeInput2schema}

                    setInput={setInput}
                  />
                )
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
