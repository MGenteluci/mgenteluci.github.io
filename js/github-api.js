var imgElement = document.getElementById('profile');
var nameElement = document.getElementById('name');
var bioElement = document.getElementById('bio');

function buscarPerfil(){
    axios.get('https://api.github.com/users/mgenteluci')
        .then(function (response) {

            imgElement.setAttribute('src', response.data.avatar_url);

            var textName = document.createTextNode(response.data.name);
            nameElement.appendChild(textName);

            var textBio = document.createTextNode(response.data.bio);
            bioElement.appendChild(textBio);

        })
        .catch(function (error){
            console.warn(error);
        });
}

buscarPerfil();