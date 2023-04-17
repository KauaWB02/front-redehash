function validandoCampos() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  // const alert = document.getElementById('alert');

  if (!name.value) {
    name.style.border = '3px solid red';
    // alert.style.display = 'block';
    // alert.innerHTML += 'Informe um nome de usuário <br/>';
  } else {
    name.style.border = 'none';
    // alert.style.display = 'none';
    // alert.innerHTML = '';
  }

  if (
    !email.value.includes('@') ||
    !email.value.includes('.com') ||
    email.value.length < 10
  ) {
    email.style.border = '3px solid red';
    // alert.style.display = 'block';
    // alert.innerHTML += 'Informe um E-mail valido! <br/>';
  } else {
    email.style.border = 'none';
    // alert.style.display = 'none';
    alert.innerHTML = '';
  }

  if (password.value !== password2.value) {
    password2.style.border = '3px solid red';
    password.style.border = '3px solid red';
    // alert.style.display = 'block';
    // alert.innerHTML += 'As senhas tem que ser iguais <br/>';
  } else {
    password2.style.border = 'none';
    password.style.border = 'none';
    // alert.style.display = 'none';
    // alert.innerHTML = '';
  }
}

async function criarConta() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const name = document.getElementById('name');

  const alert = document.getElementById('alert');

  const objectBody = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  await requisicao('http://localhost:3000/user', objectBody, 'POST').then(
    (data) => {
      if (data) {
        window.location = '/';
      } else {
        alert.style.display = 'block';
        alert.innerHTML = 'Não foi possivel cadastrar usuário';
      }
    }
  );
}

async function requisicao(url, body, tipoRequisicao) {
  try {
    const response = await fetch(url, {
      method: tipoRequisicao,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    let dados = await response.json();

    return dados;
  } catch (error) {
    console.log(error);
  }
}
