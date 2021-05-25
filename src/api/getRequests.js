import {address} from './requestData'
import {port} from './requestData'

// universal get request
export let get = route => {
    return (
        fetch(address + port + '/' + route, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    )
}
// configuration get request
export let getConfiguration = () => {
    return (
        fetch(address + port + '/configuration', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    )
}
// sources get request
export let getSources = () => {
    return (
        fetch(address + port + '/sources', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // authorization goes here
            }
        })
        .then(res => res.json())
    )
}
// destinations get request
export let getDestinations = () => {
    return (
        fetch(address + port + '/destinations', {
            method: 'GET',
            headers: {
                'Accept': 'applications',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    )
}