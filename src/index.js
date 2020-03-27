import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WebMidi from 'webmidi';
import retry from 'async-retry';

class MidiContext extends Component {
  constructor(props) {
    super(...arguments);
    this.state = { inputs: [] };

    this.initializeMidi();
  }

  componentWillUnmount() {
    console.info('Removing MIDI event listeners')
    this.state.inputs.forEach((input) => input.removeListener());
  }

  async initializeMidi() {
    await retry(async () => {
      console.info('Attempting to initialize MIDI');
      WebMidi.enable((err) => {
        if (!err) {
          console.info('MIDI enabled');
          this.state.inputs = WebMidi.inputs;
        }
      });
    });
  }

  render() {
    return (
      <></>
    );
  }
}

ReactDOM.render(<MidiContext />, document.getElementById('root'));

export default MidiContext;
