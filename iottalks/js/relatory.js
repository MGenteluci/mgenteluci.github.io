const tempoArcoAberto = document.querySelector('#tempo-arco-aberto');
const consumoDiario = document.querySelector('#consumo-diario');
const datePicker = document.querySelector('#date-picker');

function hasUser() {
  return localStorage.getItem('user');
}

function redirectToLogin() {
  window.alert('É necessário estar logado para visualizar relatório');
  window.location.href = 'index.html';
}

function createRelatory(relatory) {
  tempoArcoAberto.textContent = `Tempo de consumo: ${relatory.tempoArcoAberto} minutos`;
  consumoDiario.textContent = `Consumo: ${relatory.consumoDiario} KW`;
}

function clearRelatory() {
  tempoArcoAberto.textContent = 'Nenhum consumo encontrado para este dia';
  consumoDiario.textContent = '';
}

function getMonth(month) {
  return month < 10 ? `0${month + 1}` : month + 1;
}

datePicker.addEventListener('change', async() => {
  try {
    const relatory = await axios.get(`http://ec2-35-172-193-18.compute-1.amazonaws.com/events/${datePicker.value}`);
    createRelatory(relatory.data);
  } catch (err) {
    console.log(err)
    clearRelatory();
    window.alert('Nenhum consumo encontrado para o dia selecionado');
  }
});

function logout() {
  localStorage.clear();
}

(async() => {
  if (!hasUser()) redirectToLogin();

  const today = new Date();
  datePicker.value = `${today.getFullYear()}-${getMonth(today.getMonth())}-${today.getDate()}`;

  try {
    const relatory = await axios.get(`http://ec2-35-172-193-18.compute-1.amazonaws.com/events/${datePicker.value}`);
    createRelatory(relatory.data);
  } catch (err) {
    clearRelatory();
    window.alert('Nenhum consumo encontrado para o dia selecionado');
  }
})();
