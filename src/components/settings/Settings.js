import React from 'react'

import SettingsHeader from './SettingsHeader'
import SettingsNavigation from './SettingsNavigation'
import SettingsComponent from './SettingsComponent'
import SettingsFooter from './SettingsFooter'
import SettingsAccount from './SettingsAccount'
import './settings.scss'
import {get} from '../../api/getRequests'

class Settings extends React.Component {
    state = {
        components: ['Room','Sources','Destinations','Program Audio','Displays', 'Audio'],
        selectedComponent: 'Sources',
        showAccount: false,
        username: '',
        modal: 'sending',
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
                    // methods
                    handleConfigurationArrayChange={this.props.handleConfigurationArrayChange}
                    handleConfigurationArrayAppend={this.props.handleConfigurationArrayAppend}
                    handleConfigurationArrayDelete={this.props.handleConfigurationArrayDelete}
                    handleConfigurationArrayChangeArrayItem={this.props.handleConfigurationArrayChangeArrayItem}
                    handleState={this.handleState}
                    getApi={this.props.getApi}
                    postApi={this.props.postApi}
                    handleConfigurationKeyItem={this.props.handleConfigurationKeyItem}
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
        this.props.getApi('configuration')
    }
}
export default Settings