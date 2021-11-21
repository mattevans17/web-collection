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

function signOut(onResponse) {
    fetch(
        '/api/accounts/sign_out/',
    )
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}

function getLogin(onResponse) {
    fetch('/api/accounts/get_login/')
        .then(response => response.json())
        .then(data => onResponse && onResponse(data))
}


export default {register, login, getLogin, signOut}