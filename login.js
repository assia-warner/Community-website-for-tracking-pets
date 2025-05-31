document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
  
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
  
    if (email === savedEmail && password === savedPassword) {
      alert("Login successful!");
      // Redirect to community page
      window.location.href = "community.html"; // you'll make this later 😎
    } else {
      alert("Invalid email or password!");
    }
  });
  