const form = document.querySelector("form");
const btnBack = document.querySelector("#backToHomeOffices");
const pError = document.querySelector('#pError');

form.addEventListener('submit', event => {

    event.preventDefault();

    axios.patch(`https://hoffice-api.herokuapp.com/users/password/${getCookieValue('userId')}`, {
        password: form.password.value,
        newPassword: form.newPassword.value
    })
    .then(res => {
        window.alert('Senha alterada, por favor faça login novamente!');
        window.location.href = 'index.html';
    })
    .catch(err => {
        pError.textContent = 'Algo não está certo';
        pError.classList.remove('invisible');
    });

});

btnBack.addEventListener('click', () => window.location.href='homeOffices.html');