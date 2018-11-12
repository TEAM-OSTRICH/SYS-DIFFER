import React, { Component } from 'react';

const SaveLoadDisplay = props => (
  <div>
    <textarea
      id="scriptTextArea"
      value={`
          Save 1 Created at 11/7/18\n
          Save 2 Created at 11/8/18\n
          Save 3 Created at 11/9/18\n`}
    />
    <br />
    <button>Save</button>
    <button>Load</button>
  </div>
);

export default SaveLoadDisplay;
