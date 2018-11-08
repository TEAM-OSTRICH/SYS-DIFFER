import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DiffDbDisplay from '../components/DiffDbDisplay.jsx';
import ScriptContainer from './ScriptContainer.jsx';

// const DiffDbDisplayContainer = (props) => {
//   const {
//     db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor, removeAllChanges, addAllChanges,
//   } = props;

//   const tables = db.map(tableInfo => (
//     <DiffDbDisplay
//       key={tableInfo.name}
//       tableInfo={tableInfo}
//       diffDbColors={diffDbColors}
//       addScript={addScript}
//       removeScript={removeScript}
//       backgroundColors={backgroundColors}
//       setBackgroundColor={setBackgroundColor}
//     />
//   ));

//   const killGrayBox = () => {
//     const Value = React.findDOMNode(this.refs.location).value;
//   };

//   return (
//     <div id="DiffDbDisplayContainer">
//       <button>Ge Kill Kevin</button>
//       <div id="dbDisplayContainer">
//         {tables}
//       </div>
//       <ScriptContainer
//         script={script}
//         removeAllChanges={removeAllChanges}
//         db={db}
//         diffDbColors={diffDbColors}
//         addScript={addScript}
//         backgroundColors={backgroundColors}
//         setBackgroundColor={setBackgroundColor}
//         addAllChanges={addAllChanges}
//       />
//     </div>
//   );
// };

class DiffDbDisplayContainer extends Component {
  constructor(props) {
    super(props);

    this.killGrayBox = this.killGrayBox.bind(this);
  }

  killGrayBox() {
    if (ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id === 'diffDbDisplayContainer') {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'hideScriptBox';
    } else {
      ReactDOM.findDOMNode(this.refs.diffDbDisplayContainer).id = 'diffDbDisplayContainer';
    }
  }

  render() {
    const {
      db, diffDbColors, addScript, removeScript, script, backgroundColors, setBackgroundColor, removeAllChanges, addAllChanges,
    } = this.props;
    const { killGrayBox } = this;

    const tables = db.map(tableInfo => (
      <DiffDbDisplay
        key={tableInfo.name}
        tableInfo={tableInfo}
        diffDbColors={diffDbColors}
        addScript={addScript}
        removeScript={removeScript}
        backgroundColors={backgroundColors}
        setBackgroundColor={setBackgroundColor}
      />
    ));

    return (
      <div>
        <button onClick={killGrayBox}>Ge Kill Kevin</button>
        <div id="diffDbDisplayContainer" ref="diffDbDisplayContainer">
          <div id="dbDisplayContainer">
            {tables}
          </div>
          <ScriptContainer
            script={script}
            removeAllChanges={removeAllChanges}
            db={db}
            diffDbColors={diffDbColors}
            addScript={addScript}
            backgroundColors={backgroundColors}
            setBackgroundColor={setBackgroundColor}
            addAllChanges={addAllChanges}
          />
        </div>
      </div>
    );
  }
}

export default DiffDbDisplayContainer;
