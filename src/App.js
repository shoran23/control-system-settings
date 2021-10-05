import React from 'react'
import Welcome from './components/welcome/Welcome'
import Settings from './components/settings/Settings'
import './App.scss'
import {get} from './api/getRequests'
import {post} from './api/postRequest'

class App extends React.Component {
    state = {
        signin: true,
        signinMessage: '',
        username: '',
        password: '',
        address: '',
        dev: false,
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
    handleConfigurationMidpointTransmitterChange = (midpointIndex,inputIndex,transmitter) => {
        let configuration = this.state.configuration
        configuration.io.midpoints[midpointIndex].inputs[inputIndex].transmitters.push(transmitter)
        this.setState({configuration})
    }
    getApi = (route) => {
        let port = ''
        if(this.state.dev === true) {
            port = ':9001'
        }
        get(this.state.address,port,route)
        .then(resJson => {
            console.log('resJson = ',resJson)
            let configuration = {}
            if(route === '') {
                configuration = resJson.configuration
            } else {
                configuration[route] = resJson[route]
            }
            this.setState({configuration})
            console.log('configuration response = ',configuration)
        })
    }
    postApi = (route) => {
        let body = {}
        let port = ''
        if(route === '') {
            body = this.state.configuration
        } else {
            body = this.state.configuration[route]
        }
        if(this.state.dev === true) {
            port = ':9001'
        }
        post(this.state.address,port,route,body)
        .then(resJson => console.log(resJson))
        .then(resJson => {
            let configuration = {}
            if(route === '') {
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
                        address={this.state.address}
                        dev={this.state.dev}
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
                        handleConfigurationMidpointTransmitterChange={this.handleConfigurationMidpointTransmitterChange}
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
    componentDidMount() {
        let windowLocation = window.location.href
        let scheme = windowLocation.substring(0,windowLocation.search('://') + 3)
        let windowLocationMinusScheme = windowLocation.replace(scheme,'')
        let host = ''
        if(windowLocationMinusScheme.search(':') > -1) {
            host = windowLocationMinusScheme.substring(0,windowLocationMinusScheme.search(':'))
        } else {
            host = windowLocationMinusScheme.substring(0,windowLocationMinusScheme.search('/'))
        }
        this.setState({address: scheme + host})
    }
}
export default App