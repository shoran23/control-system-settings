import React from 'react'

class SettingsHeader extends React.Component {
    render() {
        return (
            <div id='settings-header'>
                <h3>Red Thread Logo</h3>
                <button id='settings-header-account' onClick={()=> this.props.handleState('showAccount',!this.props.showAccount)}>
                    <h5>Account</h5>
                    {this.props.showAccount ?
                        <div className='small-arrow-up'/>
                    :
                        <div className='small-arrow-down'/>
                    }
                </button>
            </div>
        )
    }
}
export default SettingsHeader
 