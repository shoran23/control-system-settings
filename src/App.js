import React from 'react'
import Welcome from './components/welcome/Welcome'
import Settings from './components/settings/Settings'
import './App.scss'
import {get} from './api/getRequests'
import {post} from './api/postRequest'

class App extends React.Component {
    state = {
        signin: false,
        signinMessage: '',
        username: '',
        password: '',
        configuration: {
            name: '',
            io: {
                midpoints: [],
            },
            sources: [],
            destinations: [],
            displays: [],
            programAudio: {},
            audio: {
                address: '',
                transport_type: '',
                mics: []
            },
            touchPanel: {
                primaryColor: '',
                secondaryColor: ''
            }
        },
    }
    handleState = (key,value) => {
        this.setState({[key]: value})
    }
    handleConfigurationArrayChange = (array,index,key,value) => {
        let configuration = this.state.configuration
        configuration[array][index][key] = value
        this.setState({configuration})
    }
    handleConfigurationArrayChangeArrayItem = (array,index,key,keyIndex,value) => {
        let configuration = this.state.configuration
        configuration[array][index][key][keyIndex] = value
        this.setState({configuration})
    }
    handleConfigurationKeyItem = (key,item,value) => {
        let configuration = this.state.configuration
        configuration[key][item] = value
        this.setState({configuration})
    }
    handleConfigurationThreeKeys = (key1,key2,key3,value) => {
        let configuration = this.state.configuration
        configuration[key1][key2][key3] = value
        this.setState({configuration})    
    }
    handleConfigurationArrayAppend = (array,item) => {
        let configuration = this.state.configuration
        configuration[array].push(item)
        this.setState({configuration})
    }
    handleConfigurationArrayDelete = (array,index) => {
        let configuration = this.state.configuration
        configuration[array].splice(index,1)
        this.setState({configuration})
    }
    handleConfigurationIoMidpointChange = (midpoints) => {
        let configuration = this.state.configuration
        configuration.io.midpoints = midpoints
        this.setState({configuration})
    }
    // API
    getApi = (route) => {
        get(route)
        .then(resJson => {
            let configuration = {}
            if(route === 'configuration') {
                configuration = resJson[route]
            } else {
                configuration[route] = resJson[route]
            }
            this.setState({configuration})
        })
    }
    postApi = (route) => {
        let body = {}
        if(route === 'configuration') {
            body = this.state.configuration
        } else {
            body = this.state.configuration[route]
        }
        console.log('body = ',body)
        post(route,body)
        .then(resJson => console.log(resJson))
        .then(resJson => {
            let configuration = {}
            if(route === 'configuration') {
                configuration = resJson[bodyKey]
            } else {
                configuration[route] = resJson[route]
            }
            this.setState({configuration})
        })
    }
    render() {
        return (
            <div id='app'>
                {this.state.signin ?
                    <Settings
                        // states
                        configuration={this.state.configuration}    
                        username={this.state.username}
                        // methods
                        handleConfigurationArrayChange={this.handleConfigurationArrayChange}
                        handleConfigurationArrayAppend={this.handleConfigurationArrayAppend}
                        handleConfigurationArrayDelete={this.handleConfigurationArrayDelete}
                        handleConfigurationArrayChangeArrayItem={this.handleConfigurationArrayChangeArrayItem}
                        getApi={this.getApi}
                        postApi={this.postApi}
                        handleStateApp={this.handleState}
                        handleConfigurationKeyItem={this.handleConfigurationKeyItem}
                        handleConfigurationIoMidpointChange={this.handleConfigurationIoMidpointChange}
                    />
                :
                    <Welcome
                        // states
                        systemName={this.state.configuration.name}
                        signinMessage={this.state.signinMessage}
                        username={this.state.username}
                        password={this.state.password}
                        // methods
                        handleStateApp={this.handleState}
                        postApi={this.postApi}
                    />
                }
            </div>
        )
    }
}
export default App