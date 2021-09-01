import {address} from './requestData'
import {port} from './requestData'

// universal post request
export let post = (route,body) => {
    return (
        fetch(address + port + '/cws/settings/' + route, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    )
}