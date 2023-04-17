main();

async function main() {
  await requisicao();
}

async function requisicao() {
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  try {
    const response = await fetch(`http://localhost:3000/post/list/${idUser}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'GET',
    });

    let dados = await response.json();

    carregarPost(dados, idUser);
  } catch (error) {
    console.log(error.message);
  }
}

function carregarPost(object, idUser) {
  const container = document.getElementById('container');
  let position = 0;
  for (const objectPost of object) {
    if (objectPost.ID_USER == idUser) {
      container.innerHTML += `
      <div class="post" id="post" idUser="${objectPost.ID_USER}" idPost="${objectPost.id}">
        <div class="background-conteudo">
        <button onclick="excluirPost(${objectPost.id})">Excluir Post</button>
          <div class="info-postagem">
            <p>${objectPost.NAME}</p>
            <p>${objectPost.DATE_CREATED}</p>
          </div>
          <div class="conteudo">
            <div class="title">
              <h1>${objectPost.TITLE}</h1>
            </div>
            <div class="img">
              <img src="${objectPost.URL_IMAGE}">
            </div>
            <div class="texto">
              ${objectPost.DESCRIPTION}
            </div>
          </div>
        </div>
        <div class="comments">
          <div class="input-comments">
            <input type="text" name="comment" id="comment" placeholder="Commente nessa publicação!">
            <button onclick="comentarPost(${objectPost.id},${position})">Comentar</button>
          </div>
          <div id="todos-comentarios"></div>
        </div>
      </div>
      `;
    } else {
      container.innerHTML += `
    <div class="post" id="post" idUser="${objectPost.ID_USER}" idPost="${objectPost.id}">
      <div class="background-conteudo">
        <div class="info-postagem">
          <p>${objectPost.NAME}</p>
          <p>${objectPost.DATE_CREATED}</p>
        </div>
        <div class="conteudo">
          <div class="title">
            <h1>${objectPost.TITLE}</h1>
          </div>
          <div class="img">
            <img src="${objectPost.URL_IMAGE}">
          </div>
          <div class="texto">
            ${objectPost.DESCRIPTION}
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="input-comments">
          <input type="text" name="comment" id="comment" placeholder="Commente nessa publicação!">
          <button onclick="comentarPost(${objectPost.id},${position})">Comentar</button>
        </div>
        <div id="todos-comentarios"></div>
      </div>
    </div>
    `;
    }

    carregarComentario(objectPost.COMMENTS, objectPost.ID_USER, position);
    position++;
  }
}

function carregarComentario(objectComentarios, idDonoPost, position) {
  const comentarios = document.querySelectorAll('#todos-comentarios');
  const {idUser} = JSON.parse(localStorage.getItem('info'));

  for (const comentario of objectComentarios) {
    if (comentario.id_user == idUser || idUser === idDonoPost) {
      comentarios[position].innerHTML += `
      <div class="conteudo-comment" id="idComment" idUser="${comentario.id_user}">
      <button onclick="excluirComentario(${comentario.id})">Excluir</button>
      <div class="info-comment">
        <p>${comentario.name}</p>
        <p>${comentario.date_comment}</p>
      </div>
      <div class="comment">
        ${comentario.comment}
      </div>
    </div>
      
      `;
    } else {
      comentarios[position].innerHTML += `
      <div class="conteudo-comment">
        <div class="info-comment">
          <p>${comentario.name}</p>
          <p>${comentario.date_comment}</p>
        </div>
        <div class="comment">
          ${comentario.comment}
        </div>
      </div>
      `;
    }
  }
}

async function comentarPost(idPost, position) {
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  const comentario = document.querySelectorAll('#comment');

  const objectComment = {
    idUser: idUser,
    comment: comentario[position].value,
  };

  try {
    await fetch(`http://localhost:3000/comment/create/${idPost}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(objectComment),
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function excluirComentario(idComment) {
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  try {
    await fetch(`http://localhost:3000/comment/delete/${idComment}`, {
      headers: {
        Authorization: `bearer ${token}`,
        iduser: idUser,
      },
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function excluirPost(idPost) {
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));
  try {
    await fetch(`http://localhost:3000/post/delete/${idPost}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function postar() {
  const title = document.getElementById('title').value;
  const linkImg = document.getElementById('link').value;
  const description = document.getElementById('description').value;
  const {idUser, token} = JSON.parse(localStorage.getItem('info'));

  const objectPost = {
    title: title,
    description: description,
    url_image: linkImg,
  };

  try {
    await fetch(`http://localhost:3000/post/create/${idUser}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(objectPost),
    }).then(() => {
      window.location = '../pages/home.html';
    });
  } catch (error) {
    console.log(error.message);
  }
}
