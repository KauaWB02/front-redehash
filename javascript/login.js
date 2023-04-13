function validaEmail() {
  const email = document.getElementById('email');
  const alert = document.getElementById('alert');
  if (
    !email.value.includes('@') ||
    !email.value.includes('.com') ||
    email.value.length < 10
  ) {
    email.style.border = '3px solid red';
    alert.style.display = 'block';
    alert.innerHTML = 'Informe um E-mail valido!';
  } else {
    email.style.border = 'none';
    alert.style.display = 'none';
    email.style.border = '';

  }
}

function validaPassword() {
  const password = document.getElementById('password');
  const alert = document.getElementById('alert');

  if (password.value.length <= 5) {
    alert.style.display = 'block';
    alert.innerHTML = 'Informe uma SENHA maior que 5 dígitos!';
    password.style.border = '3px solid red';
  } else {
    password.style.border = 'none';
    alert.style.display = 'none';
    email.style.border = '';
  }
}
