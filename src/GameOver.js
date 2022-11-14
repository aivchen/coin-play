import React from 'react'

export class GameOver extends React.Component {

  constructor (props, context) {
    super(props, context)
  }

  render () {
    if (!this.props.isGameOver) {
      return null
    }
    return (
      <div>
        Конец игры. Вы заработали ${this.props.amount}
      </div>
    )
  }
}
