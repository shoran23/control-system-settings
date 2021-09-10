import React from 'react'
import PhysicalIO from './settings-components/physical_io/PhysicalIO'
import Sources from './settings-components/Sources'
import Destinations from './settings-components/Destinations'
import Displays from './settings-components/Displays'
import ProgramAudio from './settings-components/ProgramAudio'
import SettingsComponentModal from './settings-components/modal/SettingsComponentModal'
import TouchPanel from './settings-components/TouchPanel'
import ConfigurationMain from './settings-components/configuration/ConfigurationMain'

class SettingsComponent extends React.Component {
    returnSelectedComponent = component => {
        switch(component) {
            case 'Physical IO': return (
                <PhysicalIO
                    // states
                    configuration={this.props.configuration}
                    // methods
                    handleConfigurationIoMidpointChange={this.props.handleConfigurationIoMidpointChange}
                    handleConfigurationMidpointTransmitterChange={this.props.handleConfigurationMidpointTransmitterChange}
                />
            )
            case 'Sources':  return (
                <Sources
                    // states
                    sources={this.props.configuration.sources}
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                />
            )
            case 'Destinations': return (
                <Destinations
                    // states
                    destinations={this.props.configuration.destinations}
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                />
            )
            case 'Displays': return (
                <Displays
                    // states
                    displays={this.props.configuration.displays}
                    destinations={this.props.configuration.destinations}
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                />
            )
            case 'Program Audio': return (
                <ProgramAudio
                    // states
                    programAudio={this.props.configuration.programAudio}
                    destinations={this.props.configuration.destinations}
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                    handleConfigurationKeyItem={this.props.handleConfigurationKeyItem}
                />
            )
            case 'Touch Panel': return (
                <TouchPanel 
                    // states
                    touchPanel={this.props.configuration.touchPanel}
                    // methods
                    handleConfigurationKeyItem={this.props.handleConfigurationKeyItem}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                />
            )
            case 'Configuration': return (
                <ConfigurationMain
                    // states
                    configuration={this.props.configuration}
                />
            )
        }
    }
    render() {
        return (
            <div id='settings-component' onClick={()=> this.props.handleState('showAccount',false)}>
                {this.returnSelectedComponent(this.props.selectedComponent)}
                {this.props.modal !== null ?
                    <SettingsComponentModal
                        // states
                        modal={this.props.modal}
                    />
                :
                    <React.Fragment/>
                }
            </div>
        )
    }
}
export default SettingsComponent