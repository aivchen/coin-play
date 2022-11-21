import moment from 'moment/moment'
import React from 'react'
import { Logger } from './Logger'
import { GameOver } from './GameOver'

export class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      balance: 100,
      bet: 0,
      winValue: 0,
      logs: [],
      gameOver: false
    }
    this.handleBet = this.handleBet.bind(this)
    this.play = this.play.bind(this)
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  tick () {
    this.setState({
      date: new Date()
    })
  }

  handleBet (event) {
    let val = event.target.value
    if (!/^\d+$/.test(val)) {
      return
    }
    val = +val
    if (val >= 0) {
      this.setState({ bet: +val })
    }
  }

  addBet (val) {
    this.setBet(this.state.bet + val)
  }

  setPercent (val) {
    this.setBet(Math.round(this.state.balance / 100 * val))
  }

  setBet (val) {
    if (val < 0 || val > this.state.balance) {
      return
    }
    this.setState({ bet: val })
  }

  updateBet (balance) {
    if (this.state.bet > balance) {
      this.setBet(balance)
    }
  }

  log (m) {
    m = moment().format('HH:mm:ss: ') + m
    this.setState({
      logs: [...this.state.logs, m]
    })
  }

  renderPercentButtons () {
    return ([...Array(10).keys()].map((n) =>
      <button key={n.toString()} onClick={() => this.setPercent(n * 10)}>{n * 10}%</button>))
  }

  play () {
    if (this.state.bet === 0) {
      this.log('Ставка должна быть больше нуля')
      return
    }
    const val = Math.random() > 0.4 ? +this.state.bet : -this.state.bet

    let playResult = 'Вы ничего не выиграли'
    if (val < 0) {
      playResult = 'Вы проиграли $' + Math.abs(val)
    }
    if (val > 0) {
      playResult = 'Вы выиграли $' + Math.abs(val)
    }

    const newBalance = this.state.balance + val

    this.setState({ winValue: val, balance: newBalance })
    this.updateBet(newBalance)
    if (newBalance === 0) {
      this.state.gameOver = true
    }
    this.log(playResult)
  }

  render () {
    return <div>
      <div>
        Баланс: ${this.state.balance}
      </div>
      <div>
        Ставка: <input type="number" value={this.state.bet} onChange={this.handleBet}/>
      </div>
      <div>
        <button onClick={() => this.addBet(25)}>+ $25</button>
        <button onClick={() => this.addBet(-25)}>- $25</button>
        {this.renderPercentButtons()}
        <button onClick={() => this.setBet(this.state.balance)}>All-in</button>
      </div>
      <div>
        <button onClick={this.play}>Играть!</button>
      </div>
      <GameOver isGameOver={this.state.gameOver} amount={this.state.balance}></GameOver>
      <Logger messages={this.state.logs}/>
    </div>
  }
}
