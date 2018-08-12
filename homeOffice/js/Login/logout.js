const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', () => {

    removeAllCookies();

    window.location.href = "index.html";
});

removeAllCookies = () => {

    let cookies = document.cookie.split('; ').map(cookie => {
        return cookie.split('=');
    });

    cookies.forEach(cookie => {
        document.cookie = `${cookie[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    });
};