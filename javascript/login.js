async function criarConta() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const name = document.getElementById('name');

  const objectBody = {name:name, email: email.value, password: password.value};
  await requisicao('http://localhost:3000/user',objectBody,'POST').then((data)=>{
    console.log(data)
  });
}

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

async function login() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const alert = document.getElementById('alert');
  try {
    const objectBody = {email: email.value, password: password.value};

    let dados = await requisicao(
      'http://localhost:3000/login',
      objectBody,
      'POST'
    );

    if (!dados.token) {
      throw {message: dados.error};
    }

    let info = {
      idUser: dados.user.id,
      token: dados.token,
    };
    localStorage.setItem('info', JSON.stringify(info));
    window.location = '../pages/home.html';
  } catch (error) {
    alert.style.display = 'block';
    alert.innerHTML = error.message;
    password.style.border = '3px solid red';
    email.style.border = '3px solid red';
    console.log(error.message);
  }
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
