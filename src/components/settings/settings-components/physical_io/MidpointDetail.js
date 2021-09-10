import React from 'react'
import {get} from '../../../../api/getRequests'

class MidpointEndpoint extends React.Component {
    render() {
        return (
            <div className='midpoint-endpoint'>
                {this.props.type === 'input' ?
                    <React.Fragment>
                        <h4>{this.props.input.label}</h4>
                        {this.props.input.transmitter !== null ?
                            <select
                                onChange={this.props.handleTransmitterSelection}
                            >
                                <option value={null}>None</option>
                                {this.props.transmitters.map((transmitter,index) => (
                                    <option value={index}>{`${transmitter.make} ${transmitter.model}`}</option>
                                ))}
                            </select>
                        :
                            <React.Fragment/>
                        }
                    </React.Fragment>
                :
                    <React.Fragment>
                        <h4>{this.props.output.label}</h4>
                        {this.props.output.receiver !== null ?
                            <p>This output will need a rx slot</p>
                        :
                            <React.Fragment/>
                        }
                    </React.Fragment>
                }
            </div>
        )
    }
}
class MidpointDetail extends React.Component {
    state = {
        outputType: 'video',
        transmitters: []
    }
    handleTransmitterSelection = (e) => {
        console.log('e.target.value = ',e.target.value)
    }
    render() {
        return (
            <div className='component midpoint-detail'>
                <div className='component-header'>
                    <h1>{`${this.props.selectedMidpoint.make} ${this.props.selectedMidpoint.model}`}</h1>
                    <button onClick={()=> this.props.handleSelectedMidpoint(null)}>Return</button>
                </div>
                <div className='component-body midpoint-body'>
                    <div className='midpoint-chasis'>
                        <div id='midpoint-chasis-header'>
                            <h4>{this.props.selectedMidpoint.make}</h4>
                            <h4>{this.props.selectedMidpoint.model}</h4>  
                        </div>
                        <div id='midpoint-chasis-io'>
                            <div className='midpoint-chasis-col' id='midpoint-chasis-inputs'>
                                <nav className='midpoint-chasis-col-type'/>
                                {this.props.selectedMidpoint.io.inputs.map((input,index) => (
                                    <MidpointEndpoint
                                        // states
                                        key={index}
                                        input={input}
                                        type='input'
                                        transmitters={this.state.transmitters}
                                        // methods
                                        handleTransmitterSelection={this.handleTransmitterSelection}
                                    />
                                ))}
                            </div>
                            <div className='midpoint-chasis-col' id='midpoint-chasis-outputs'>
                                <nav className='midpoint-chasis-col-type'>
                                    <button className='midpoint-chasis-col-type-button' onClick={()=> this.setState({outputType: 'video'})}>Video</button>
                                    <button className='midpoint-chasis-col-type-button' onClick={()=> this.setState({outputType: 'audio'})}>Audio</button>
                                    <button className='midpoint-chasis-col-type-button' onClick={()=> this.setState({outputType: 'usb'})}>USB</button>
                                </nav>
                                
                                {this.state.outputType === 'audio' ?
                                    <React.Fragment>
                                        {this.props.selectedMidpoint.io.outputs.audio.map((output,index) => (
                                            <MidpointEndpoint
                                                key={index}
                                                output={output}
                                                type='output'
                                            />
                                        ))} 
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                        {this.state.outputType === 'video' ?
                                            <React.Fragment>
                                                {this.props.selectedMidpoint.io.outputs.video.map((output,index) => (
                                                    <MidpointEndpoint
                                                        key={index}
                                                        output={output}
                                                        type='output'
                                                    />
                                                ))}
                                            </React.Fragment>
                                        :
                                            <React.Fragment>
                                                {this.props.selectedMidpoint.io.outputs.usb.map((output,index) => (
                                                    <MidpointEndpoint
                                                        key={index}
                                                        output={output}
                                                        type='output'
                                                    />
                                                ))}
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        get('transmitters')
        .then(resJson => this.setState({transmitters: resJson.transmitters}))
    }
}
export default MidpointDetail