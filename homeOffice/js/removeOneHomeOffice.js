let btns = document.querySelectorAll('table button');
let alertRmv = document.querySelector('#alertRemoveHomeOfficeFromSomeoneElse');
const regexCookies = /(token|username)=\w+/;
const regexCookieToken = /token=\w+/;

hasButton = () => {

    if(btns.length === 0){
        btns = document.querySelectorAll('table button');
        return setTimeout(hasButton, 1);
    }
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = this.event.target.id;
            let nameFromTd = this.event.target.parentNode.parentNode.firstChild.textContent;
            removeOneHomeOffice(id, nameFromTd);
        });
    });
};

hasButton();

doesHomeOfficeBelongtoCurrentUser = nameFromTd => {

    if(getCookieValue('name') === nameFromTd)
        return true;

    alertRmv.textContent = 'Não é possível remover o Home Office de outra pessoa';
    alertRmv.classList.remove('invisible');
    return false;
};

getCookies = () => {

    let cookies = document.cookie.split('; ');
    let cookiesRetornados = [];

    cookies.forEach(cookie => {

        if(regexCookies.test(cookie))
            cookiesRetornados.push(cookie);

    });

    return cookiesRetornados;
};

removeOneHomeOffice = (id, nameFromTd) => {

    if(!doesHomeOfficeBelongtoCurrentUser(nameFromTd))
        return;

    let cookies = getCookies();
    let token = '';

    cookies.forEach(cookie => {
        if(regexCookieToken.test(cookie)){

            token = cookie.substring(6);

        }
    });

    if(token === '' || token === null){
        alert('Você não possui permissão para remover um Home Office');
        return;
    }

    let config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }

    axios.delete(`https://hoffice-api.herokuapp.com/homeOffices/${id}`, config)
    .then(res => {
        console.log(res.data.message);
        tbody.innerHTML = '';    
        getAllHomeOffices();
        window.location.href="homeOffices.html";
    })
    .catch(err => console.warn(err));
};