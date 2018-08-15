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
        pError.innerHTML =  `
                            Usuário não pode ser nulo
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            `;  
        pError.classList.remove('invisible');
        return false;
    }

    if(form.day.value === '' || form.day.value === null){
        pError.innerHTML =  `
                            Data não pode ser nula
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            `;
        pError.classList.remove('invisible');
        return false;
    }
    
    let h = new Date();
    let hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());
    let data = new Date(day);
    
    if(data.getTime() < hoje.getTime()){
        pError.innerHTML =  `
                            Data não pode ser anterior ao dia de hoje
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            `;
        pError.classList.remove('invisible');
        return false;
    }
    
    if(data.getFullYear() > hoje.getFullYear()+1){
        pError.innerHTML =  `
                            Data não pode ser tão distante
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            `;
        pError.classList.remove('invisible');
        return false;
    }

    return true;
};