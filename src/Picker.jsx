import React from 'react';
import './Picker.css';

/**
 * Picker component.
 */
class Picker extends React.Component {
  state = {
    today: new Date(),
    currMonth: new Date().getMonth(),
    currYear: new Date().getFullYear(),
    days: {...Array(42)},
  };
  /**
   * @param {object} props constructor
   */
  constructor(props) {
    super(props);
    this.monthMap = {
      '0': 'January', '1': 'February', '2': 'March', '3': 'April', '4': 'May',
      '5': 'June', '6': 'July', '7': 'August', '8': 'September', '9': 'October',
      '10': 'November', '11': 'December',
    };
    this.myRef = React.createRef();
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
  /**
   * @param {Event} e
   */
  selectNewDay = (e) => {
    this.myRef = e.currentTarget;
    if (this.myRef.className === 'prevMonth') {
      const day = this.myRef.innerText;
      let newToday;
      if (this.prevMonth() === 11) {
        newToday = new Date(this.state.currYear - 1, 11, day);
      } else {
        newToday = new Date(this.state.currYear, this.prevMonth(), day);
      }
      this.setState({today: newToday});
      this.prev();
    } else if (this.myRef.className === 'nextMonth') {
      const day = this.myRef.innerText;
      let newToday;
      if (this.nextMonth() === 0) {
        newToday = new Date(this.state.currYear + 1, 0, day);
      } else {
        newToday = new Date(this.state.currYear, this.nextMonth(), day);
      }
      this.setState({today: newToday});
      this.next();
    } else {
      const day = this.myRef.innerHTML;
      const newToday = new Date(this.state.currYear,
        this.state.currMonth, day);
      this.setState({today: newToday});
    }
  };
    /**
   * @return {object} a <div> containing the picker
   */
  render() {
    return (
      <div id='picker' className='picker'>
        <div className='nav'>
          <div id='prev' data-testid='prev'
            onClick={() => this.prev()}>&lt;</div>
          <div id='display' data-testid='display' onClick={() => this.reset()}>
            {this.monthMap[this.state.currMonth] + ' ' + this.state.currYear}
          </div>
          <div id='next' data-testid='next'
            onClick={() => this.next()}>&gt;</div>
        </div>
        <div className='labelContainer'>
          {this.weekDays.map((item) => <div key={item}>{item}</div>)}
        </div>
        <div className='days'>{this.getDays()}</div>
      </div>
    );
  }
  /**
   * @return {Array} an array of div elements with the days of the month
   */
  getDays() {
    const days = [];
    const first = new Date(this.state.currYear, this.state.currMonth);
    const last = new Date(this.state.currYear, this.nextMonth(), 0);
    for (let i = 1; i < 43; i++) {
      if ((i-1) < first.getDay()) {
        if (this.state.today.getDate() === this.state.days[i-1] &&
          this.state.today.getMonth() === this.prevMonth() &&
          (this.state.today.getFullYear() === this.state.currYear ||
          this.state.today.getFullYear() === this.state.currYear - 1)) {
          days.push(<div key={i-1} id='today' data-testid='today-test'
            className='prevMonth'>
            {this.state.days[i-1]}</div>);
        } else {
          days.push(<div key={i-1} id={`d` + (i-1)} data-testid={`d` + (i-1)}
            className='prevMonth'
            onClick={(e) => this.selectNewDay(e)}>
            {this.state.days[i-1]}</div>);
        }
      } else if ((i-1) >= last.getDate() + first.getDay()) {
        if (this.state.today.getDate() === this.state.days[i-1] &&
          this.state.today.getMonth() === this.nextMonth() &&
          (this.state.today.getFullYear() === this.state.currYear ||
          this.state.today.getFullYear() === this.state.currYear + 1)) {
          days.push(<div key={i-1} id='today' data-testid='today-test'
            className='nextMonth'>
            {this.state.days[i-1]}</div>);
        } else {
          days.push(<div key={i-1} id={`d` + (i-1)} data-testid={`d` + (i-1)}
            className='nextMonth'
            onClick={(e) => this.selectNewDay(e)}>
            {this.state.days[i-1]}</div>);
        }
      } else {
        if (this.state.today.getDate() === this.state.days[i-1] &&
          this.state.today.getMonth() === this.state.currMonth &&
          this.state.today.getFullYear() === this.state.currYear) {
          days.push(<div key={i-1} id='today' data-testid='today-test'
            className='currMonth'>
            {this.state.days[i-1]}</div>);
        } else {
          days.push(<div key={i-1} id={`d` + (i-1)} data-testid={`d` + (i-1)}
            className='currMonth'
            onClick={(e) => this.selectNewDay(e)}>
            {this.state.days[i-1]}</div>);
        }
      }
    }
    return days;
  }
  /**
   * Runs after the picker component mounted
   */
  componentDidMount() {
    this.updateDays();
  }
  /**
   * Runs after the state changes
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currMonth !== this.state.currMonth ||
        prevState.today !== this.state.today) {
      this.updateDays();
    }
  }
  /**
   * Function used to set the date of 'today' from the parent component
   * @param {Date} date
   */
  setDate(date) {
    this.setState({currMonth: date.getMonth(),
      currYear: date.getFullYear(), today: date});
  };
  /**
   * Updates the current month/year state var
   */
  next() {
    if (this.state.currMonth === 11) {
      this.setState({currMonth: 0});
      this.setState((prevState) => ({currYear: prevState.currYear + 1}));
    } else {
      this.setState((prevState) => ({currMonth: prevState.currMonth + 1}));
    }
  };
  /**
   * Updates the current month/year state var
   */
  prev() {
    if (this.state.currMonth === 0) {
      this.setState({currMonth: 11});
      this.setState((prevState) => ({currYear: prevState.currYear - 1}));
    } else {
      this.setState((prevState) => ({currMonth: prevState.currMonth - 1}));
    }
  }
  /**
   * @return {Number} the corresponding next month
   */
  nextMonth() {
    if (this.state.currMonth === 11) {
      return 0;
    } else {
      return this.state.currMonth + 1;
    }
  }
  /**
   * @return {Number} the corresponding prev month
   */
  prevMonth() {
    if (this.state.currMonth === 0) {
      return 11;
    } else {
      return this.state.currMonth - 1;
    }
  }
  /**
   * Reset the calendar back to today with the current month/year/day
   */
  reset() {
    const date = new Date();
    this.setState({currMonth: date.getMonth(),
      currYear: date.getFullYear(), today: date});
  }
  /**
   * Updates the days state variable
   */
  updateDays() {
    let prevMonth = new Date(this.state.currYear,
      this.state.currMonth, 0).getDate();
    let index = new Date(this.state.currYear, this.state.currMonth).getDay();
    const tempDays = [];
    for (let i = 1; i <= new Date(this.state.currYear,
      this.state.currMonth + 1, 0).getDate(); i++) {
      tempDays[index] = i;
      index++;
    }
    let n = 1;
    while (index <= 42) {
      tempDays[index] = n;
      n++;
      index++;
    }
    index = new Date(this.state.currYear, this.state.currMonth).getDay() - 1;
    while (index >= 0) {
      tempDays[index] = prevMonth;
      index--;
      prevMonth--;
    }
    this.setState({days: tempDays});
  }
};

export default Picker;
