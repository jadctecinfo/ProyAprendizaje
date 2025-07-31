document.getElementById('login-toggle').addEventListener('click', function() {
  const form = document.getElementById('login-form');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'flex';
  } else {
    form.style.display = 'none';
  }
});
