import React from 'react'

import './settings-components.scss'

class Room extends React.Component {

    handleRoomChange = e => {
        this.props.handleConfigurationKeyItem('room',e.target.name,e.target.value)
    }
    render() {
        return (
            <div className='component'>

                <div className='component-header'>
                    <h1>Room</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button' onClick={()=> this.props.getApi('room')}>Pull From Processor</button>
                        <button className='component-button' onClick={()=> this.props.postApi('room')}>Send To Processor</button>
                    </div>
                </div>

                <div className='component-body'>

                    <form className='component-form' id='room-component-form'>

                        <div className='room-form-column'>
                            <label htmlFor='name'>Room Name</label>
                            <input 
                                className='room-form-input'
                                type='text' 
                                placeholder='Example: "Classroom 101"'
                                name='name' 
                                value={this.props.configuration.room.name}
                                onChange={this.handleRoomChange}
                            />
                        </div>

                        <div className='room-form-column'>
                            <label htmlFor='passcode'>Room Passcode</label>
                            <input 
                                className='room-form-input'
                                type='number' 
                                placeholder='Example: 1234'
                                name='passcode' 
                                value={this.props.configuration.room.passcode}
                                onChange={this.handleRoomChange}
                            />
                        </div>
                        
                        <div className='room-form-column'>
                            <label htmlFor='number'>Room Phone Number</label>
                            <input 
                                className='room-form-input'
                                type='text'
                                placeholder='Example: (123)456-7890'
                                name='number' 
                                value={this.props.configuration.room.number}
                                onChange={this.handleRoomChange}
                            />
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
export default Room