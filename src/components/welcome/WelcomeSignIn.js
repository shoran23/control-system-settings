import React from 'react'

class WelcomeSignIn extends React.Component {
    handleChange = e => {
        this.props.handleStateApp(e.target.name,e.target.value)
    }
    render() {
        return (
            <div id='welcome-signin'>
                <form id='welcome-signin-form'>
                    <h3 id='welcome-signin-h3'>Sign In Below</h3>
                    <p id='welcome-signin-message'>{this.props.signinMessage}</p>
                    <input
                        className='welcome-signin-input'
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={this.props.username}
                        onChange={this.handleChange}
                    />
                    <input
                        className='welcome-signin-input'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.props.password}
                        onChange={this.handleChange}
                    />
                    <button id='welcome-signin-login-button' onClick={this.props.handleSignIn}>Log In</button>
                </form>
            </div>
        )
    }
}
export default WelcomeSignIn