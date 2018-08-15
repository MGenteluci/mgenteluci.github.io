const form = document.querySelector('form');
const pError = document.querySelector('#pError');

form.addEventListener('submit', event => {

    event.preventDefault();

    if(!validaForm(form))
        return;

    axios.post('https://hoffice-api-stg.herokuapp.com/homeOffices', {
        userId: form.user.value,
        day: form.day.value
    })
    .then(res => {
        formCleaner();
        tbody.innerHTML = '';    
        getAllHomeOffices();
        window.location.href="homeOffices.html";
    })
    .catch(err => console.warn(err));

});

formCleaner = () => {
    pError.textContent = '';
    form.user.value = '';
    form.day.value = '';
    form.user.focus();
};

validaForm = form => {

    let user = form.user.value;
    let day = form.day.value.split('-');

    if(user === '' || user === null){
        pError.textContent = 'Usuário não pode ser nulo';
        pError.classList.remove('invisible');
        return false;
    }
    
    let h = new Date();
    let hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());
    let data = new Date(day);
    
    if(data.getTime() < hoje.getTime()){
        pError.textContent = 'A data do Home Office não pode ser anterior ao dia de hoje';
        pError.classList.remove('invisible');
        return false;
    }
    
    if(data.getFullYear() > hoje.getFullYear()+1){
        pError.textContent = 'Não é possível marcar um Home Office para uma data tão distante';
        pError.classList.remove('invisible');
        return false;
    }

    return true;
};