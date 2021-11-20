const config = {
    requestParams: {
        postJSON: data => ({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data ? JSON.stringify(data) : null,
        })
    }
}


export default config