export let post = (address,port,route,body) => {
    return (
        fetch(address + port + '/cws/settings/' + route, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Security-Policy': 'connect-src self'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    )
}