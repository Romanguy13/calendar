import React from 'react';
import Picker from './Picker';
import './App.css';

/**
 * Simple component with no state.
 *
 */
class App extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  /**
   * @return {object} a <div> containing an <h2>
   */
  render() {
    return (
      <div>
        <h2>React Calendar</h2>
        <Picker ref={this.child}/>
        <input id='date' data-testid='date'
          type="text" placeholder='MM/DD/YYY'/>
        <input id='set' data-testid='set'
          type='submit' value='Set' onClick={()=>this.send()}/>
      </div>
    );
  }
  /**
   *
   * @param {*} event
   */
  send = (event) => {
    // Got the regular expression from this source:
    // https://regexlib.com/REDetails.aspx?regexp_id=808
    const reg = new RegExp(['^(?:(?:0?[13578]|1[02])|(?:0?[469]|11)(?!\\/31)',
      '|(?:0?2)(?:(?!\\/3[01]|\\/29\\/(?:(?:0[^48]|[13579][^26]|[2468]',
      '[^048])00|(?:\\d{2}(?:0[^48]|[13579][^26]|[2468][^048]))))))',
      '\\/(?:0?[1-9]|[12][0-9]|3[01])\\/\\d{4}$'].join(''));
    // const reg = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const val = document.getElementById('date').value;
    if (reg.test(val)) {
      const date = new Date(val);
      this.child.current.setDate(date);
    }
  };
}

export default App;
