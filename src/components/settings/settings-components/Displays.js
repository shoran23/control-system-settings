import React from 'react'
import './settings-components.scss'

const emptyDisplay = {
    name: '',
    destination: null,
    type: null,
    powerStatus: null,
    listenStatus: null,
    powerOnJoin: '',
    powerOffJoin: '',
    powerToggleJoin: '',
    listenJoin: '',
}
class Display extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedDisplay === this.props.index ?
                    <div className='component-list-item-active' onClick={()=> this.props.handleDisplaySelect(this.props.index)}>
                        <div className='component-list-item-title'> 
                            <h3 className='component-list-item-title-label'>{`Display ${this.props.index + 1}:`}</h3>
                            <p className='component-list-item-title-content'>{this.props.display.name}</p>
                        </div>
                    </div>
                :
                    <div className='component-list-item-inactive' onClick={()=> this.props.handleDisplaySelect(this.props.index)}>
                        <div className='component-list-item-title'> 
                            <h3 className='component-list-item-title-label'>{`Display ${this.props.index + 1}:`}</h3>
                            <p className='component-list-item-title-content'>{this.props.display.name}</p>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
class Displays extends React.Component {
    state = {
        selectedDisplay: null,
    }
    handleDisplaySelect = displayIndex => {
        this.setState({selectedDisplay: displayIndex})
    }
    handleDisplayChange = e => {
        this.props.handleConfigurationArrayChange('displays',this.state.selectedDisplay,e.target.name,e.target.value)
    }
    handleSourceDelete = () => {
        this.setState({selectedSource: null})
        this.props.handleConfigurationArrayDelete('displays',this.state.selectedDisplay)
    }
    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    <h1>System Displays</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button' onClick={()=> this.props.getApi('displays')}>Pull From Processor</button>
                        <button className='component-button' onClick={()=> this.props.postApi('displays')}>Send To Processor</button>
                        <button className='component-add-button' onClick={()=> this.props.handleConfigurationArrayAppend('displays',emptyDisplay)}>Add Display</button>
                    </div>
                </div>


                <div className='component-body'>
                    {this.props.displays.length > 0 ?
                        <div className='component-list'>
                            {this.props.displays.map((display,index) => (
                                <Display
                                    // states
                                    key={index}
                                    index={index}
                                    display={display}
                                    destinations={this.props.destinations}
                                    selectedDisplay={this.state.selectedDisplay}
                                    // methods
                                    handleDisplaySelect={this.handleDisplaySelect}
                                />
                            ))}
                        </div>
                    :
                        <div className='component-list-not-available'>
                            <h3>No Displays Available</h3>
                        </div>
                    }
                    {this.state.selectedDisplay !== null ?
                        <div className='component-detail'>
                            <div className='component-detail-header'>
                                <h3>Display Details</h3>
                                <button className='component-detail-close' onClick={()=> this.handleDisplaySelect(null)}>Close</button>
                            </div>
                            <form className='component-form'>
                                <div className='component-form-input-row'>
                                    <label htmlFor='name'>Name:</label>
                                    <input 
                                        className='component-form-input'
                                        type='text'
                                        name='name'
                                        value={this.props.displays[this.state.selectedDisplay].name}
                                        onChange={this.handleDisplayChange}
                                    />
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='destination'>Destination</label>
                                    <select
                                        className='component-form-input'
                                        name='destination'
                                        value={this.props.displays[this.state.selectedDisplay].destination}
                                        onChange={this.handleDisplayChange}
                                    >
                                        <option value='none'>Select Option</option>
                                        {this.props.destinations.map((destination,index) => (
                                            <option key={index} value={index}>{destination.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='type'>Display Type</label>
                                    <select
                                        className='component-form-input'
                                        name='type'
                                        value={this.props.displays[this.state.selectedDisplay].type}
                                        onChange={this.handleDisplayChange} 
                                    >
                                        <option value={null}>Select Option</option>
                                    </select>
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='powerOnJoin'>Power On Join</label>
                                    <input 
                                        type='number'
                                        name='powerOnJoin' 
                                        value={this.props.displays[this.state.selectedDisplay].powerOnJoin}
                                        onChange={this.handleDisplayChange}
                                    />
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='powerOffJoin'>Power Off Join</label>
                                    <input 
                                        type='number' 
                                        name='powerOffJoin' 
                                        value={this.props.displays[this.state.selectedDisplay].powerOffJoin}
                                        onChange={this.handleDisplayChange}
                                    />
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='powerToggleJoin'>Power Toggle Join</label>
                                    <input 
                                        type='number' 
                                        name='powerToggleJoin' 
                                        value={this.props.displays[this.state.selectedDisplay].powerToggleJoin}
                                        onChange={this.handleDisplayChange}
                                    />
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='listenJoin'>Listen Join</label>
                                    <input
                                        type='number'
                                        name='listenJoin'
                                        value={this.props.displays[this.state.selectedDisplay].listenJoin}
                                        onChange={this.handleDisplayChange}
                                    />
                                </div>
                            </form>
                            <button className='component-form-delete' onClick={this.handleSourceDelete}>Delete</button>
                        </div>
                    :
                        <React.Fragment/>
                    }
                </div>
            </div>
        )
    }
}
export default Displays