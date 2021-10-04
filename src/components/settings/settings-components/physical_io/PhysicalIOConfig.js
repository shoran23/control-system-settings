import React from 'React'

import {get} from "../../../../api/getRequests"

class MidpointIndexItem extends React.Component {
    render() {
        return (
            <div className='physical-io-midpoint-index'>
                <h3>{this.props.midpoint.make}  {this.props.midpoint.model}</h3>
                <button>View Details</button>
                <button onClick={()=> this.props.handleAddToSystem(this.props.index)}>Add to system</button>
            </div>
        )
    }
}
class SystemMidpointIndexItem extends React.Component {
    render() {
        return (
            <div className='physical-io-midpoint-system-index'>
                <p>{this.props.midpoint.make}</p>
                <p>{this.props.midpoint.model}</p>
                {this.props.midpoint.additionalConfig ? 
                    <button onClick={()=> this.props.handleSelectedMidpoint(this.props.midpoint)}>Settings</button>
                :
                    <React.Fragment/>
                }
                <button onClick={()=> this.props.handleRemoveFromSystem(this.props.index)}>Remove</button>
            </div>
        )
    }
}
class PhysicalIOConfig extends React.Component {
    state = {                   
        midpoints: [],
        midpointResults: [],
        searchText: ''
    }
    handleSearchMidpoints = () => {
        let midpointResults = []
        for(let midpoint of this.state.midpoints) {
            if(midpoint.make.search(this.state.searchText) != -1 || midpoint.model.search(this.state.searchText) != -1) {
                midpointResults.push(midpoint)
            }
        }
        this.setState({midpointResults})
    }
    handleSearchText = e => {
        this.setState({[e.target.name]: e.target.value})
        this.handleSearchMidpoints()
    }
    handleAddToSystem = (index) => {
        let midpoints = this.props.configuration.io.midpoints
        if(this.state.searchText === '') {
            midpoints.push(this.state.midpoints[index])
        } else {
            midpoints.push(this.state.midpointResults[index])
        }
        this.props.handleConfigurationIoMidpointChange(midpoints)
    }
    handleRemoveFromSystem = (index) => {
        let midpoints = this.props.configuration.io.midpoints
        midpoints.splice(index,1)
        this.props.handleConfigurationIoMidpointChange(midpoints)
    }
    getMidpoints = () => {
        let port = ''
        if(this.props.dev === true) {
            port = ':9001'
        }
        get(this.props.address,port,'midpoints')
        .then(resJson => {
            console.log('resJson = ',resJson)
        })
    }
    render() {
        console.log('address = ',this.props.address)
        return (
            <div className='component'>
                <div className='component-header'>
                    <h1>System Physical IO</h1>
                    <div className='component-header-buttons'>
                        <button className='component-button'>Pull From Processor</button>
                        <button className='component-button'>Send To Processor</button>
                    </div>
                </div>

                <div id='physical-io-component-body' className='component-body'>
                    <div id='physical-io-header'>

                            {this.props.configuration.io.midpoints.length > 0 ?
                                <React.Fragment>
                                    {this.props.configuration.io.midpoints.map((midpoint,index) => (
                                        <SystemMidpointIndexItem
                                            // states
                                            key={index}
                                            index={index}
                                            midpoint={midpoint}
                                            // methods
                                            handleRemoveFromSystem={this.handleRemoveFromSystem}
                                            handleSelectedMidpoint={this.props.handleSelectedMidpoint}
                                        />
                                    ))}
                                </React.Fragment>
                            :
                                <h3>Add system midpoints from the list below.</h3>
                            }

                    </div>
                    <div id='physical-io-search'>
                        <input
                            id='physical-io-search-input'
                            className='physical-io-search-item'
                            type='text'
                            name='searchText'
                            placeholder='Search Midpoints'
                            value={this.state.searchText}
                            onChange={this.handleSearchText}
                        />
                    </div>
                    <div id='physical-io-results'>
                        {this.state.midpoints.length > 0 ?
                            <div id='physical-io-results-list'>
                                {this.state.searchText === '' ?
                                    <React.Fragment>
                                        {this.state.midpoints.map((midpoint,index) => (
                                            <MidpointIndexItem
                                                // states
                                                key={index}
                                                index={index}
                                                midpoint={midpoint}
                                                // methods
                                                handleAddToSystem={this.handleAddToSystem}
                                            />
                                        ))}
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                        {this.state.midpointResults.map((midpoint,index) => (
                                            <MidpointIndexItem
                                                // states
                                                key={index}
                                                midpoint={midpoint}
                                            />
                                        ))}
                                    </React.Fragment>
                                }
                            </div>
                        :
                            <p>No midpoints found.</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        setTimeout(()=> this.getMidpoints(),200)
    }
}
export default PhysicalIOConfig