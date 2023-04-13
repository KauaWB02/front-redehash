function validaEmail() {
  const email = document.getElementById('email');
  if (
    !email.value.includes('@') ||
    !email.value.includes('.com') ||
    email.value.length < 10
  ) {
    email.style.border = '3px solid red';
  } else {
    email.style.border = 'none';
  }
}

function validaPassword() {
  const password = document.getElementById('password');
  console.log(password.value.length <= 5)
  if (password.value.length <= 5) {
    password.style.border = '3px solid red';
  } else {
    password.style.border = 'none';
  }
}
