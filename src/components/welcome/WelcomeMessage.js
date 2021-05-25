import React from 'react'

class WelcomeMessage extends React.Component {
    render() {
        return (
            <div id='welcome-message'>
                <div id='welcome-message-container'>
                    <h1>Red Thread Spaces</h1>
                    <h2>{this.props.systemName}</h2>
                    <h3>Sign in to access system settings</h3>
                </div>
            </div>
        )
    }
}
export default WelcomeMessage
