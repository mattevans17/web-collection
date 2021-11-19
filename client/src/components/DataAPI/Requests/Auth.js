import config from "./Config"


function register(login, password, onResponse) {
    fetch(
        config.path('register'),
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
        config.path('login'),
        config.requestParams.postJSON({
            login: login,
            password: password
        })
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}


export default {register, login}