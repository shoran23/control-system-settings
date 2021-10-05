import React from 'react'
import './settings-components.scss'

const emptyDestination = {
    name: '',
    routeJoin: 0,
}
class Destination extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedDestination === this.props.index ?
                    <div className='component-list-item-active' onClick={()=> this.props.handleState('selectedDestination',this.props.index)}>
                        <h3 className='component-list-item-title'>{`Destination ${this.props.index + 1}:`}</h3>
                        <p>{this.props.destination.name}</p>
                    </div>
                :
                    <div className='component-list-item-inactive' onClick={()=> this.props.handleState('selectedDestination',this.props.index)}>            
                        <h3 className='component-list-item-title'>{`Destination ${this.props.index + 1}:`}</h3>
                        <p>{this.props.destination.name}</p>
                    </div>
                }
            </React.Fragment>
        )
    }
}
class Destinations extends React.Component {
    state = {
        selectedDestination: null,
    }
    handleState = (key,value) => {
        this.setState({[key]: value})
    }
    handleDestinationChange = e => {
        this.props.handleConfigurationArrayChange('destinations',this.state.selectedDestination,e.target.name,e.target.value)
    }
    handleDestinationDelete = () => {
        this.setState({selectedDestination: null})
        this.props.handleConfigurationArrayDelete('destinations',this.state.selectedDestination)
    }
    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    <h1>System Destinations</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button' onClick={()=> this.props.getApi('destinations')}>Pull From Processor</button>
                        <button className='component-button' onClick={()=> this.props.postApi('destinations')}>Send To Processor</button>
                        <button className='component-add-button' onClick={()=> this.props.handleConfigurationArrayAppend('destinations',emptyDestination)}>Add Destination</button>
                    </div>
                </div>
                <div className='component-body'>
                    <div className='component-list'>
                        {this.props.destinations.map((destination,index) => (
                            <Destination
                                // states
                                key={index}
                                index={index}
                                destination={destination}
                                selectedDestination={this.state.selectedDestination}
                                // methods
                                handleState={this.handleState}
                            />
                        ))}
                    </div>
                    {this.state.selectedDestination !== null ?
                        <div className='component-detail'>
                            <div className='component-detail-header'>
                                <h3>Destination Detail</h3>
                                <button className='component-detail-close' onClick={()=> this.handleState('selectedDestination',null)}>Close</button>
                            </div>
                            <form className='component-form'>
                                <div className='component-form-input-row'>
                                    <label htmlFor='name'>Name:</label>
                                    <input
                                        type='text'
                                        name='name'
                                        value={this.props.destinations[this.state.selectedDestination].name}
                                        onChange={this.handleDestinationChange}
                                    />
                                </div>
                                <div className='component-form-input-row'>
                                    <label htmlFor='routeJoin'>Route Join:</label>
                                    <input 
                                        type='number'
                                        name='routeJoin' 
                                        value={this.props.destinations[this.state.selectedDestination].routeJoin}
                                        onChange={this.handleDestinationChange}
                                    />
                                </div>
                            </form>
                            <button className='component-form-delete' onClick={this.handleDestinationDelete}>Delete Destination</button>
                        </div>
                    :
                        <React.Fragment/>
                    }
                </div>
            </div>
        )
    }
}
export default Destinations
