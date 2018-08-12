const form = document.querySelector('form');
const pError = document.querySelector('#pError');

form.addEventListener('submit', event => {
    event.preventDefault();

    if(!isLoginFormValid(form))
        return;

    let username = form.username.value;
    let password = form.password.value;

    axios.post('https://hoffice-api.herokuapp.com/users/signin', { username: username, password: password})
    .then(res => {

        setCookieToken(res.data.token);
        setCookieUsername(username);
        
        window.location.href = 'homeOffices.html';
    })
    .catch(err => {
        pError.textContent = 'Usuário não autorizado';
        pError.classList.remove('invisible');
        
    });

});

setCookieToken = token => {
    document.cookie = `token=${token}`;
};

setCookieUsername = username => {
    document.cookie = `username=${username}`;
};

isLoginFormValid = form => {

    let user = form.username.value;
    let pwd = form.password.value;

    if(user === '' || user === null){
        pError.textContent = 'Usuário inválido';
        pError.classList.remove('invisible');
        return false;
    }

    if(pwd === '' || pwd === null){
        pError.textContent = 'Senha inválida';
        pError.classList.remove('invisible');
        return false;
    }

    return true;
};