async function carregarAmigos() {
  const menuAmigos = document.getElementById('menu-amigos');
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  var styles = window.getComputedStyle(menuAmigos);

  if (styles.display == 'none') {
    menuAmigos.style.display = 'flex';

    try {
      let response = await fetch(`http://localhost:3000/friend/${idUser}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
        method: 'GET',
      });

      let dados = await response.json();

      for (const objectAmigos of dados) {
        menuAmigos.innerHTML += `
        <div class="amigos">
          <p>${objectAmigos.NAME}</p>
          <button onclick="excluirAmigo(${objectAmigos.ID})">Excluir</button>
        </div>`;
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    menuAmigos.style.display = 'none';
    menuAmigos.innerHTML = '';
  }
}

async function excluirAmigo(idComentario) {
  const {token} = JSON.parse(localStorage.getItem('info'));

  try {
    await fetch(`http://localhost:3000/friend/delete/${idComentario}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
}

async function carregarSolicitacoes() {
  const menuSolicitacao = document.getElementById('menu-solicitacao');
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  var styles = window.getComputedStyle(menuSolicitacao);

  if (styles.display == 'none') {
    menuSolicitacao.style.display = 'flex';

    try {
      let response = await fetch(
        `http://localhost:3000/friend/invites/${idUser}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
          method: 'GET',
        }
      );

      let dados = await response.json();

      for (const objectAmigos of dados) {
        menuSolicitacao.innerHTML += `
        <div class="solicitacao">
          <p>${objectAmigos.NAME}</p>
          <button onclick="aceitarAmigo(${objectAmigos.ID_USER_FROM})">Aceitar</button>
          <button onclick="recusarAmigo(${objectAmigos.ID_USER_FROM})">Recusar</button>
        </div>`;
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    menuSolicitacao.style.display = 'none';
    menuSolicitacao.innerHTML = '';
  }
}

async function aceitarAmigo(idUserFrom) {
  try {
    const {idUser, token} = JSON.parse(localStorage.getItem('info'));
    await fetch(`http://localhost:3000/friend/invite/accept/${idUser}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({idUserRequest: idUserFrom}),
    });
  } catch (error) {
    console.log(error);
  }
}

async function recusarAmigo(idUserFrom) {
  try {
    const {idUser, token} = JSON.parse(localStorage.getItem('info'));

    await fetch(`http://localhost:3000/friend/invite/refuse`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method: 'DELETE',
      body: JSON.stringify({IdUserFrom: idUserFrom, IdUserTo: idUser}),
    });
  } catch (error) {
    console.log(error);
  }
}

async function talvezAmigos() {
  const menuTalvez = document.getElementById('menu-talvez');
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  var styles = window.getComputedStyle(menuTalvez);

  if (styles.display == 'none') {
    menuTalvez.style.display = 'flex';

    try {
      let response = await fetch(`http://localhost:3000/users/${idUser}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
        method: 'GET',
      });

      let dados = await response.json();

      for (const objectAmigos of dados) {
        menuTalvez.innerHTML += `
        <div class="talvez">
          <p>${objectAmigos.name}</p>
          <button onclick="enviarSolicitacao(${objectAmigos.id})">Enviar solicitação</button>
        </div>`;
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    menuTalvez.style.display = 'none';
    menuTalvez.innerHTML = '';
  }
}

async function enviarSolicitacao(idTo) {
  try {
    const {idUser, token} = JSON.parse(localStorage.getItem('info'));
    await fetch(`http://localhost:3000/friend/add`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({IdUserFrom: idUser, IdUserTo: idTo}),
    });
  } catch (error) {
    console.log(error);
  }
}
