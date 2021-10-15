import React from 'react'

import './settings-components.scss'

class Room extends React.Component {

    handleRoomChange = index => e => {
        let rooms = this.props.configuration.rooms
        rooms[index][e.target.name] = e.target.value
        this.props.handleConfigurationKeyItem('rooms',rooms)
    }
    render() {
        console.log('config = ',this.props.configuration)
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
                    {this.props.configuration.rooms.map((room,index) => (
                        <form className='component-form' id='room-component-form'>
                            <div className='room-form-column'>
                                <label htmlFor='name'>Room Name</label>
                                <input 
                                    className='room-form-input'
                                    type='text' 
                                    placeholder='Example: "Classroom 101"'
                                    name='name' 
                                    value={room.name}
                                    onChange={this.handleRoomChange(index)}
                                />
                            </div>
                            <div className='room-form-column'>
                                <label htmlFor='passcode'>Room Passcode</label>
                                <input 
                                    className='room-form-input'
                                    type='text' 
                                    placeholder='Example: 1234'
                                    name='passCode' 
                                    value={room.passCode}
                                    onChange={this.handleRoomChange(index)}
                                />
                            </div>
                            <div className='room-form-column'>
                                <label htmlFor='number'>Room Phone Number</label>
                                <input 
                                    className='room-form-input'
                                    type='text'
                                    placeholder='Example: (123)456-7890'
                                    name='number' 
                                    value={room.number}
                                    onChange={this.handleRoomChange(index)}
                                />
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        )
    }
}
export default Room