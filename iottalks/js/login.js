const form = document.querySelector('form');

function storeUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function validateForm() {
  const email = document.forms[0].elements.email.value;
  const password = document.forms[0].elements.password.value;

  if (!email) return false;
  if (!password) return false;
  if (email.length < 6) return false;
  if (password.length < 6) return false;
  return true;
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  if (!validateForm()) {
    window.alert('Usuário ou senha inválidos');
    return;
  };

  const payload = {
    email: document.forms[0].elements.email.value,
    password: document.forms[0].elements.password.value
  };

  try {
    const response = await axios.post('http://ec2-35-172-193-18.compute-1.amazonaws.com/users/signin', payload);
    storeUser(response.data);
    window.location.href = 'relatory.html';
  } catch (err) {
    window.alert('Usuário ou senha inválidos');
    console.log(err.message);
  }
});

localStorage.clear();
