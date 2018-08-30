(() => {

    let cookies = document.cookie.split('; ').map(cookie => {
        return cookie.split('=');
    });

    if(cookies.length < 6)
        window.location.href = 'index.html';

})();