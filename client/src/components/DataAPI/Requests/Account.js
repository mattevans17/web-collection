import config from "./Config"


function register(login, password, onResponse) {
    fetch(
        '/api/accounts/register/',
        config.requestParams.postJSON({
            login: login,
            password: password
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function login(login, password, onResponse) {
    fetch(
        '/api/accounts/login/',
        config.requestParams.postJSON({
            login: login,
            password: password
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}


export default {register, login}