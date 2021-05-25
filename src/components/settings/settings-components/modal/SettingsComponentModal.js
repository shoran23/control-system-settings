import React from 'react'
import SendingModal from './SendingModal'
import './settings-component-modal.scss'

class SettingsComponentModal extends React.Component {
    returnComponent = (component) => {
        switch(component) {
            case 'sending': return (
                <SendingModal/>
            )
        }
    }
    render() {
        return (
            <div className='settings-component-modal'>
                {this.returnComponent(this.props.modal)}
            </div>
        )
    }
}
export default SettingsComponentModal