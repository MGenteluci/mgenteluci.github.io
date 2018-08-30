const form = document.querySelector("form");
const btnBack = document.querySelector("#backToHomeOffices");
const pError = document.querySelector('#pError');

form.addEventListener('click', () => {

    axios.post('https://hoffice-api-stg.herokuapp.com/users/changePassword', {
        userId: getCookieValue('userId'),
        password: form.password.value,
        newPassword: form.newPassword.value
    })
    .then(res => {
        
    })
    .catch(err => {
        pError.textContent = 'Não autorizado';
        pError.classList.remove('invisible');
    });

});

btnBack.addEventListener('click', () => window.location.href='homeOffices.html');