import React from 'react'
import './welcome.scss'
import WelcomeSignIn from './WelcomeSignIn'
import WelcomeFooter from './WelcomeFooter'
import WelcomeMessage from './WelcomeMessage'
import {post} from '../../api/postRequest'

class Welcome extends React.Component {
    state = {
        getStarted: false,
    }
    handleState = (key,value) => {
        this.setState({[key]: value})
    }
    handleSignIn = e => {
        e.preventDefault()
        let body = {
            'username': this.props.username,
            'password': this.props.password
        }
        post('login',body)
        .then(resJson => {
            if(resJson.authentication === 'success') {
                this.props.handleStateApp('signin',true)
                this.props.handleStateApp('signinMessage','')
            } else {
                this.props.handleStateApp('signinMessage','Sign In Failed')
                this.props.handleStateApp('password','')
            }
        })
    }
    render() {
        return (
            <div id='welcome'>
                <WelcomeMessage/>
                <WelcomeSignIn
                    // states
                    username={this.state.username}
                    password={this.state.password}
                    signinMessage={this.props.signinMessage}
                    // methods
                    handleState={this.handleState}
                    handleSignIn={this.handleSignIn}
                    handleStateApp={this.props.handleStateApp}
                />
                <WelcomeFooter/>
            </div>
        )
    }
}
export default Welcome