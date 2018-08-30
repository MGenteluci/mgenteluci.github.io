(() => {

    let cookies = document.cookie.split('; ').map(cookie => {
        return cookie.split('=');
    });

	let count = 0;
	cookies.forEach(c => {
        if(c[0] === 'token' || c[0] === 'name' || c[0] === 'userId' || c[0] === 'teamId' || c[0] === 'teamChatUrl' || c[0] === 'userRole')
			count++;
    });
	
    if(count != 6)
        window.location.href = 'index.html';

})();