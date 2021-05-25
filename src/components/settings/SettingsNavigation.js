import React from 'react'

class SettingsNavigationButton extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.selectedComponent === this.props.component ?
                    <button className='settings-navigation-button-active' id={`settings-nav-${this.props.component}`} onClick={()=> this.props.selectComponent(this.props.component)}>{this.props.component}</button>
                :
                    <button className='settings-navigation-button-inactive' id={`settings-nav-${this.props.component}`} onClick={()=> this.props.selectComponent(this.props.component)}>{this.props.component}</button>
                }
            </React.Fragment>
        )
    }
}
class SettingsNavigation extends React.Component {
    render() {
        return (
            <div id='settings-left' onClick={()=> this.props.handleState('showAccount',false)}>
                <div id='settings-nav'>
                    {this.props.components.map((component,index) => (
                        <SettingsNavigationButton
                            // states
                            key={index}
                            component={component}
                            selectedComponent={this.props.selectedComponent}
                            // methods
                            selectComponent={this.props.selectComponent}
                        />
                    ))}
                </div>
            </div>
        )
    }
}
export default SettingsNavigation