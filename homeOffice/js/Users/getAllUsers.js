const select = document.querySelector('.selectUser');

getAllUsers = () => {
    axios.get('https://hoffice-api.herokuapp.com/users')
    .then(res => {
        
        fillSelect(res.data);

    })
    .catch(err => console.error(err));
};

getAllUsers();

fillSelect = (usersList) => {
    usersList.forEach(user => {
        const opt = document.createElement('option');
        opt.setAttribute('value', user._id);
        opt.textContent = user.name + " " + user.surname;

        select.appendChild(opt);
    });
};