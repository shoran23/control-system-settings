import React from 'React'
import {getMidpoints} from '../../../api/getRequests'

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
                <button>Settings</button>
                <button onClick={()=> this.props.handleRemoveFromSystem(this.props.index)}>Remove</button>
            </div>
        )
    }
}
class PhysicalIO extends React.Component {
    state = {
        systemMidpoints: [],    // this will be moved to the configuration
        midpoints: [],
        midpointResults: [],
        selectedMidpoint: null,
        searchText: ''
    }
    retrieveMidpoints = () => {
        getMidpoints()
        .then(resJson => {
            this.setState({midpoints: resJson.midpoints})
        })
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
        let systemMidpoints = this.state.systemMidpoints
        if(this.state.searchText === '') {
            systemMidpoints.push(this.state.midpoints[index])
        } else {
            systemMidpoints.push(this.state.midpointResults[index])
        }
        this.setState({systemMidpoints})
    }
    handleRemoveFromSystem = (index) => {
        let systemMidpoints = this.state.systemMidpoints
        systemMidpoints.splice(index,1)
        this.setState({systemMidpoints})
    }
    render() {
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

                        
                            {this.state.systemMidpoints.length > 0 ?
                                <React.Fragment>
                                    {this.props.io.midpoints.map((midpoint,index) => (
                                        <SystemMidpointIndexItem
                                            // states
                                            key={index}
                                            index={index}
                                            midpoint={midpoint}
                                            // methods
                                            handleRemoveFromSystem={this.handleRemoveFromSystem}
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
        this.retrieveMidpoints()
    }
}
export default PhysicalIO