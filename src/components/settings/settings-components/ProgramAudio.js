import React from 'react'
import './settings-components.scss'

class ProgramAudio extends React.Component {
    handleProgramAudioChange = e => {
        this.props.handleConfigurationKeyItem('programAudio',e.target.name,e.target.value)
    }
    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    <h1>System Program Audio</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button' onClick={()=> this.props.getApi('programAudio')}>Pull From Processor</button>
                        <button className='component-button' onClick={()=> this.props.postApi('programAudio')}>Send To Processor</button>
                    </div>
                </div>
                <div className='component-body'>
                    <div className='component-list'>
                        <form>
                            <div className='component-list-item-inactive'>
                                <label htmlFor='routeType'>Route Type</label>
                                <select
                                    name='routeType'
                                    value={this.props.programAudio.routeType}
                                    onChange={this.handleProgramAudioChange}
                                >
                                    <option value=''>Select Option</option>
                                    <option value='display-listen'>Display Listen</option>
                                    <option value='follow-last-video-route'>Follow Last Video Route</option>
                                    <option value='matrix-route'>Matrix Route</option>
                                </select>
                            </div>
                            <div className='component-list-item-inactive'>
                                <label htmlFor='routeValue'>Route Value Option</label>
                                <select
                                    name='routeValue'
                                    value={this.props.programAudio.routeValue}
                                    onChange={this.handleProgramAudioChange}
                                >
                                    <option value=''>Select Option</option>
                                    <option value='follow-video'>Follow Video</option>
                                    <option value='dmps-offset'>DMPS Offset</option>
                                    <option value='custom'>Custom Values</option>
                                </select>
                            </div>
                            <div className='component-list-item-inactive'>
                                <label htmlFor='audioDestination'>Audio Destination</label>
                                <select
                                    name='audioDestination'
                                    value={this.props.programAudio.audioDestination}
                                    onChange={this.handleProgramAudioChange}
                                >
                                    <option value={null}>Select Destination</option>
                                    {this.props.destinations.map((destination,index) => (
                                        <option key={index} value={index}>{destination.name}</option>
                                    ))}
                                </select>     
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProgramAudio