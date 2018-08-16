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
        sendMessageToSlack(form.day.value);
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

    if(form.day.value === '' || form.day.value === null){
        pError.textContent = 'Data não pode ser nula';
        pError.classList.remove('invisible');
        return false;
    }
    
    let h = new Date();
    let hoje = new Date(h.getFullYear(), h.getMonth(), h.getDate());
    let data = new Date(day);
    
    if(data.getTime() < hoje.getTime()){
        pError.textContent = 'Data não pode ser anterior ao dia de hoje';
        pError.classList.remove('invisible');
        return false;
    }
    
    if(data.getFullYear() > hoje.getFullYear()+1){
        pError.textContent = 'Data não pode ser tão distante';
        pError.classList.remove('invisible');
        return false;
    }

    return true;
};

sendMessageToSlack = dayFromForm => {
    let name = getCookieValue('name');
    let day = new Date(dayFromForm.split('-'));

    let options = {
        text: `${name} marcou um Home Office para o dia ${day.toLocaleDateString()}`
    };

    axios.post('https://hooks.slack.com/services/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', 
    JSON.stringify(options))
    .then(result => window.location.href="homeOffices.html")
    .catch(err => {
        console.warn('Não foi possível enviar mensagem para o Slack');
        console.error(err);
        window.location.href="homeOffices.html";
    });
}