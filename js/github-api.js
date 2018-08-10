var imgElement = document.getElementById('profile');
var nameElement = document.getElementById('name');
var bioElement = document.getElementById('bio');
var textName;
var textBio;

(function(){

    document.cookie = "token=CookieTokenDeTeste";
    document.cookie = 'user=Teste';

    console.log('Cookies: ');
    console.log(document.cookie);
    console.warn('##############');
    
    console.log(`Cookies splitados por ';' :`)
    console.log(document.cookie.split(';'));
    console.warn('##############');

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/mgenteluci");

    xhr.addEventListener("load", function(){

        var data = JSON.parse(xhr.response);

        if(xhr.status == 200){
            imgElement.setAttribute('src', data.avatar_url);
            textName = document.createTextNode(data.name);
            textBio = document.createTextNode(data.bio);
            
        }else{
            textName = document.createTextNode("Matheus Genteluci");
            textBio = document.createTextNode("Estudante - Sistemas de Informação");
            console.warn("Status da requisição à API do Github: " + xhr.status);
        }
        
        nameElement.appendChild(textName);
        bioElement.appendChild(textBio);

    });

    xhr.send();
})();