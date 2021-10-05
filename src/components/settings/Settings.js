import React from 'react'

import SettingsHeader from './SettingsHeader'
import SettingsNavigation from './SettingsNavigation'
import SettingsComponent from './SettingsComponent'
import SettingsFooter from './SettingsFooter'
import SettingsAccount from './SettingsAccount'
import './settings.scss'

class Settings extends React.Component {
    state = {
        components: ['Room','Physical IO','Sources','Destinations','Program Audio','Displays', 'Audio','Touch Panel','Configuration'],
        selectedComponent: 'Sources',
        showAccount: false,
        username: '',
        modal: null,
    }
    selectComponent = component => {
        this.setState({selectedComponent: component})
    }
    handleState = (key,value) => {
        this.setState({[key]: value})
    }
    render() {
        return (
            <div id='settings'>
                <SettingsHeader
                    // states
                    showAccount={this.state.showAccount}
                    // methods
                    handleState={this.handleState}
                />
                <SettingsNavigation
                    // states
                    components={this.state.components}
                    selectedComponent={this.state.selectedComponent}
                    // methods
                    selectComponent={this.selectComponent}
                    handleState={this.handleState}
                />
                <SettingsComponent
                    // states
                    selectedComponent={this.state.selectedComponent}
                    configuration={this.props.configuration}
                    modal={this.state.modal}
                    address={this.props.address}
                    dev={this.props.dev}
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    handleState={this.handleState}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                    handleConfigurationKeyItem={this.props.handleConfigurationKeyItem}
                    handleConfigurationThreeKeys={this.props.handleConfigurationThreeKeys}
                    handleConfigurationIoMidpointChange={this.props.handleConfigurationIoMidpointChange}
                    handleConfigurationMidpointTransmitterChange={this.props.handleConfigurationMidpointTransmitterChange}
                />
                <SettingsFooter/>
                {this.state.showAccount ?
                    <SettingsAccount    
                        // states
                        username={this.props.username}
                        // methods
                        handleStateApp={this.props.handleStateApp}
                    />
                :
                    <React.Fragment/>
                }
            </div>
        )
    }
    componentDidMount() {
        setTimeout(() => this.props.getApi(''),100)
    }
}
export default Settings