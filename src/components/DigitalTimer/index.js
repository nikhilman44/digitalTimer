// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isPaused: true, count: 25, min: 25, sec: '00', timerRunning: false}

  increseCount = () => {
    const {isPaused} = this.state
    if (isPaused === true) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        min: prevState.count + 1,
      }))
    }
  }

  decreseCount = () => {
    const {isPaused} = this.state
    if (isPaused === true) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        min: prevState.count - 1,
      }))
    }
  }

  resetTimer = () => {
    const {isPaused} = this.state
    if (isPaused === true) {
      this.setState(prevState => ({min: prevState.count, sec: '00'}))
    }
  }

  startPauseTimer = () => {
    const {timerRunning} = this.state
    let timeStart = ''
    this.setState(prevState => ({isPaused: !prevState.isPaused}))
    let interval = null
    if (timerRunning === false) {
      this.setState({timerRunning: true})
      interval = setInterval(() => {
        const {min, sec} = this.state
        if (parseInt(sec) === 0 && parseInt(min) !== 0) {
          timeStart = setTimeout(() => {
            this.setState(prevState => ({min: prevState.min - 1, sec: 59}))
          }, 1000)
        } else if (parseInt(sec) === 0 && parseInt(min) === 0) {
          clearInterval(interval)
          this.setState({min: '00', sec: '00'})
        } else {
          clearTimeout(timeStart)
          this.setState(prevState => ({sec: prevState.sec - 1}))
        }
      }, 1000)
    } else if (timerRunning === true) {
      this.setState({timerRunning: false})
      clearInterval(interval)
      const {min, sec} = this.state
      const minute = min
      const second = sec

      this.setState({min: minute, sec: second})
    }
  }

  render() {
    const {isPaused, count, min, sec} = this.state

    const playStopBtn = isPaused
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const btnAlt = isPaused ? 'play icon' : 'pause icon'
    const text = isPaused ? 'Start' : 'Pause'
    const timeText = isPaused ? 'Paused' : 'Running'

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="timer-bg">
            <p className="view-timer">
              <p>
                {min}:{sec}
              </p>
              <p>{timeText}</p>
            </p>
          </div>
          <div className="btn-main-container">
            <div className="btn-container">
              <div className="btn-container">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={this.startPauseTimer}
                >
                  <img src={playStopBtn} alt={btnAlt} className="icon" />
                </button>
                <p className="text">{text}</p>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <p className="text">Reset</p>
              </div>
            </div>
            <p className="text1">Set Timer Limit</p>
            <div className="set-time-container">
              <button
                type="button"
                className="set-time"
                onClick={this.decreseCount}
              >
                -
              </button>
              <p className="set-time-text">{count}</p>
              <button
                type="button"
                className="set-time"
                onClick={this.increseCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
