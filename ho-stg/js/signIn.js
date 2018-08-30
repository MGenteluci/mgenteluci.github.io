const form = document.querySelector('form');
const pError = document.querySelector('#pError');

form.addEventListener('submit', event => {
    event.preventDefault();

    if(!isLoginFormValid(form))
        return;

    let username = form.username.value;
    let password = form.password.value;

    axios.post('https://hoffice-api-stg.herokuapp.com/users/signin', { username: username, password: password})
    .then(res => {
        setCookieToken(res.data.token);
        setCookieFullName(res.data.user[0].name, res.data.user[0].surname);
        setCookieUserId(res.data.user[0]._id);
        setCookieTeamId(res.data.user[0].team._id);
        setCookieTeamChatUrl(res.data.user[0].team.teamChatUrl);
        setCookieUserRole(res.data.user[0].role.name);
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

setCookieFullName = (name, surname) => {
    document.cookie = `name=${name} ${surname}`;
};

setCookieUserId = userId => {
    document.cookie = `userId=${userId}`;
};

setCookieTeamId = teamId => {
    document.cookie = `teamId=${teamId}`;
}

setCookieTeamChatUrl = teamChatUrl => {
    document.cookie = `teamChatUrl=${teamChatUrl}`;
};

setCookieUserRole = userRole => {
    document.cookie = `userRole=${userRole}`;
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