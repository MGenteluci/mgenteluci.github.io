const tbody = document.querySelector('table tbody');
const role = getCookieValue('userRole');

getAllHomeOffices = () => {

    axios.get('https://hoffice-api.herokuapp.com/homeOffices/current')
    .then(res => createTable(res.data))
    .catch(err => console.warn(err));

};

getAllHomeOffices();

createTable = (homeOfficesList) => {
    homeOfficesList.forEach(ho => {

        if(!isHomeOfficeFromTheUsersTeam(ho.user.team._id))
            return;

        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.setAttribute('scope', 'row');
        tdName.textContent = `${ho.user.name} ${ho.user.surname}`;

        const tdTeam = document.createElement('td');
        tdTeam.textContent = `${ho.user.team.name}`;

        const data = new Date(ho.day);
        const tdDay = document.createElement('td');
        tdDay.textContent = `${data.getDate()+1}/${data.getMonth()+1}/${data.getFullYear()}`;

        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.classList.add('btn');
        button.classList.add('btn-outline-danger');
        button.setAttribute('id', ho._id);
        tdButton.appendChild(button);

        tr.appendChild(tdName);
        tr.appendChild(tdTeam);
        tr.appendChild(tdDay); 
        tr.appendChild(tdButton); 
        tbody.appendChild(tr);
    });
};

isHomeOfficeFromTheUsersTeam = homeOfficeTeamId => {

    let id = getCookieValue('teamId');

    if(id === homeOfficeTeamId || role === 'Coordenador')
        return true;

    return false;
};