const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("username").value,     // 👈 debe llamarse email
    contrasena: document.getElementById("passwor").value // 👈 debe llamarse contrasena
  };

  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      alert("✅ Login exitoso");
      localStorage.setItem("token", result.token); // guardar JWT
      window.location.href = "./index4.html"; // redirigir si quieres
    } else {
      alert("❌ Error: " + result.msg);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
