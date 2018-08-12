let btns = document.querySelectorAll('table button');
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
            
            removeOneHomeOffice(id);
        });
    });
};

hasButton();

removeOneHomeOffice = id => {
    let cookies = getCookies();
    let cookieToken = '';

    cookies.forEach(cookie => {
        if(regexCookieToken.test(cookie))
            cookieToken = cookie;
    });

    if(cookieToken === '' || cookieToken === null){
        alert('Você não possui permissão para remover um Home Office');
        return;
    }

    let config = {
        headers: {
            "Authorization": "Bearer " + cookieToken
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

getCookies = () => {

    let cookies = document.cookie.split('; ');
    let cookiesRetornados = [];

    cookies.forEach(cookie => {

        if(regexCookies.test(cookie))
            cookiesRetornados.push(cookie);

    });

    return cookiesRetornados;
};