document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert('Signup failed');
    console.error(err);
  }
});
