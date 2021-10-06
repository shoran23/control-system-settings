import React from 'react'

import './settings-components.scss'

class Room extends React.Component {


    render() {
        return (
            <div className='component'>

                <div className='component-header'>
                    <h1>Room</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button'>Pull From Processor</button>
                        <button className='component-button'>Send To Processor</button>
                    </div>
                </div>

                <div className='component-body'>

                    <form id='room-form'>
                        <label htmlFor='name'>Room Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            //value={this.props.room.name}
                            //onChange={}
                        />
                    </form>

                </div>
            </div>
        )
    }
}
export default Room