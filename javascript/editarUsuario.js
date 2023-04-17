carregarConta();

async function carregarConta() {
  try {
    const {idUser, token} = JSON.parse(localStorage.getItem('info'));
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const usuario = document.getElementById('usuario');
    const response = await fetch(`http://localhost:3000/user/${idUser}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    let dados = await response.json();
    console.log(email)
    usuario.innerHTML = `Editar Usuário: <span>${dados[0].name}</span>`
    name.value = dados[0].name;
    email.value = dados[0].email;

  } catch (error) {
    console.log(error);
  }
}

async function editarConta() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const name = document.getElementById('name');
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));

  const alert = document.getElementById('alert');

  const objectBody = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  await requisicao(
    `http://localhost:3000/user/${idUser}`,
    objectBody,
    'POST',
    token
  ).then((data) => {
    if (data) {
      window.location = '../pages/perfil.html';
    } else {
      alert.style.display = 'block';
      alert.innerHTML = 'Não foi possivel cadastrar usuário';
    }
  });
}

async function requisicao(url, body, tipoRequisicao, token) {
  try {
    const response = await fetch(url, {
      method: tipoRequisicao,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    let dados = await response.json();

    return dados;
  } catch (error) {
    console.log(error);
  }
}
