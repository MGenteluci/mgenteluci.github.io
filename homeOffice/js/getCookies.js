getCookieValue = cookieName => {
    let cookies = document.cookie.split('; ');  
    let cookie;
    
    cookies.forEach(c => {
        if(c.split('=')[0] === cookieName)
            cookie = c.split('=')[1];
    });

    return cookie;
};