import React from 'react'
import ConfigurationUpload from './ConfigurationUpload'
import ConfigurationDownload from './ConfigurationDownload'
import './configuration.scss'

class ConfigurationMain extends React.Component {
    state = {
        component: null
    }
    writeConfigurationFile = () => {
        let configurationJson = JSON.stringify(this.props.configuration)
        console.log('configurationJson = ',configurationJson)
    }
    render() {
        return (
            <div className='component'>
                <div id='configuration-main'>
                    <ConfigurationUpload/>
                    <ConfigurationDownload/>
                </div>
            </div>
        )
    }
}
export default ConfigurationMain