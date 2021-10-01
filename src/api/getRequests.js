export let get = (address,port,route) => {
    return (
        fetch(address + port + '/cws/settings/' + route, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Security-Policy': 'connect-src self'
            }
        })
        .then(res => res.json())
    )
}
