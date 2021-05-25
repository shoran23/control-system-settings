import React from 'react'

class SettingsAccount extends React.Component {
    render() {
        return (
            <div id='settings-account'>
                <div className='settings-account-row'>
                    <p>Red Thread Spaces</p>
                    <button className='settings-account-link' onClick={()=> this.props.handleStateApp('signin',false)}>Sign Out</button>
                </div>
                <h3>{this.props.username}</h3>
                <button className='settings-account-link'>Edit Account</button>
            </div>
        )
    }
}
export default SettingsAccount
