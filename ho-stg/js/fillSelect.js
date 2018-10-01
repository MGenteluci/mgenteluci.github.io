const select = document.querySelector('.selectUser');

getCookieValue = cookieName => {
    let cookies = document.cookie.split('; ');  
    let cookie;
    
    cookies.forEach(c => {
        if(c.split('=')[0] === cookieName)
            cookie = c.split('=')[1];
    });

    return cookie;
};

(() => {

    const opt = document.createElement('option');
    
    if(getCookieValue('userRole') === 'Estagiário' || getCookieValue('userRole') === 'Coordenador'){
        opt.textContent = 'Sem permissão';
    }else{
        opt.setAttribute('value', getCookieValue('userId'));
        opt.textContent = getCookieValue('name');
    }

    select.appendChild(opt);
})();