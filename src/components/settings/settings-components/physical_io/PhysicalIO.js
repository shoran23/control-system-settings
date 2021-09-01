import React from 'react'

import PhysicalIOConfig from './PhysicalIOConfig'
import MidpointDetail from './MidpointDetail'

class PhysicalIO extends React.Component {
    state = {
        selectedMidpoint: null
    }
    handleSelectedMidpoint = midpoint => {
        this.setState({selectedMidpoint: midpoint})
    }
    render() {
        return (
            <div className='component'>
                {this.state.selectedMidpoint === null ?
                    <PhysicalIOConfig
                        // states
                        configuration={this.props.configuration}
                        // methods
                        handConfigurationIoMidpointChange={this.props.handConfigurationIoMidpointChange}
                        handleSelectedMidpoint={this.handleSelectedMidpoint}
                    />
                :
                    <MidpointDetail
                        // states
                        selectedMidpoint={this.state.selectedMidpoint}
                    />  
                }
            </div>
        )
    }
}
export default PhysicalIO