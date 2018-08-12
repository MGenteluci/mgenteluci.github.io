let btns = document.querySelectorAll('table button');
const regexCookies = /(token|username)=\w+/;

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

    if(!regexCookies.test(cookies[0]) && !regexCookies.test(cookies[1])){
        alert('Você não tem permissão para deletar um Home Office');
        return;
    }

    let config = {
        headers: {
            "Authorization": "Bearer " + cookies[0]
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