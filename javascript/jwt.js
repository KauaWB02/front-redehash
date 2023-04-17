const info = JSON.parse(localStorage.getItem('info'));
if (!info || !info.token) {
  window.location = '/';
}
