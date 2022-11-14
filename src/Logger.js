import React from 'react'

export class Logger extends React.Component {

  constructor (props, context) {
    super(props, context)
  }

  render () {
    const messages = this.props.messages.map((m, i) => <div key={i.toString()}>{m}</div>)

    return <div>
      {messages}
    </div>
  }
}
