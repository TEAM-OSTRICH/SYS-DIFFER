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
    };

    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    // this.updateU1 = this.updateU1.bind(this);
    // this.updateU2 = this.updateU2.bind(this);
  }

  change1(event) {
    this.setState({ input1: event.target.value });
  }

  change2(event) {
    this.setState({ input2: event.target.value });
  }

  // updateU1(data) {
  //   this.setState({ u1: data });
  // }

  // updateU2(data) {
  //   this.setState({ u2: data });
  // }

  render() {
    const {
      input1, input2,
    } = this.state;
    const {
      checkBoth, change1, change2,
    } = this;

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/"
              render={
                props => (
                  <MainContainer
                    {...props}
                    input1={input1}
                    input2={input2}
                  />
                )
              }
            />
            {/* <Route
              path="/"
              render={
                props => (
                  <Check2Links
                    {...props}
                    // u1={u1}
                    // u2={u2}
                    input1={input1}
                    input2={input2}
                    checkBoth={checkBoth}
                    change1={change1}
                    change2={change2}
                    // updateU1={updateU1}
                    // updateU2={updateU2}
                  />
                )
              }
            /> */}
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
