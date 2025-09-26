const URL_PELICULAS = "http://localhost:3000/api/users/peliculas";

// Inyecta el CSS para el diseño de las tarjetas de películas
function inyectarCSSPeliculas() {
  const style = document.createElement('style');
  style.innerHTML = `
.peliculas-titulo {
    color: #fff;
    text-align: center;
    margin-top: 38vh;
    font-size: 2.2rem;
    font-family: 'InterExtraBold', Arial, sans-serif;
    letter-spacing: 2px;
}
.peliculas-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-top: 8vh;     /* <-- separación desde arriba */
    margin-bottom: 40px;
}
.pelicula-card {
    background: linear-gradient(150deg, #232526 70%, #414345 100%);
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(60, 60, 60, 0.28), 0 1.5px 0px #444;
    width: 260px;
    color: #fff;
    padding: 22px 18px 18px 18px;
    transition: transform 0.23s, box-shadow 0.23s;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pelicula-card:hover {
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 16px 38px rgba(90, 50, 150, 0.24), 0 2px 6px #444;
    border: 1.5px solid #7b39ff;
}
.pelicula-card h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: #ffb347;
    font-family: 'InterExtraBold', Arial, sans-serif;
    text-align: center;
}
.pelicula-card p {
    font-size: 1rem;
    color: #ddd;
    margin-bottom: 5px;
    min-height: 36px;
    text-align: center;
}
/* Responsive para móvil */
@media (max-width: 600px) {
    .peliculas-grid {
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
    }
    .pelicula-card {
        width: 92vw;
        padding: 11px 5vw 9px 5vw;
    }
}
  `;
  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
  inyectarCSSPeliculas();
  fetchPeliculas();
});

function fetchPeliculas() {
  const token = localStorage.getItem("token"); // Toma el token que guardaste al loguear

  if (!token) {
    document.getElementById("peliculas-lista").innerHTML = 
      `<p style="color:red">Debes loguearte para ver las películas.</p>`;
    return;
  }

  fetch(URL_PELICULAS, {
    method: "GET",
    headers: {
      "Authorization": token // Usa el token guardado
    }
  })
    .then(response => {
      if (!response.ok) throw new Error("No autorizado o error en el servidor");
      return response.json();
    })
    .then(data => {
      mostrarPeliculas(data);
    })
    .catch(err => {
      document.getElementById("peliculas-lista").innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    });
}

function mostrarPeliculas(lista) {
  const contenedor = document.getElementById("peliculas-lista");
  if (!lista || lista.length === 0) {
    contenedor.innerHTML = "<p style='color:black;'>No hay películas disponibles.</p>";
    return;
  }
  // Solo las últimas 10 (de la más nueva a la más antigua)
  const ultimas10 = lista.slice(-10).reverse();
  let html = "<h2 class='peliculas-titulo'>Películas</h2><div class='peliculas-grid'>";
  ultimas10.forEach(pelicula => {
    html += `
      <div class="pelicula-card">
        <img src="${pelicula.poster}" alt="${pelicula.titulo}" style="width:100%;max-height:300px;object-fit:cover;border-radius:10px 10px 0 0;margin-bottom:14px;">
        <h3>${pelicula.titulo || "Sin título"}</h3>
      </div>
    `;
  });
  html += "</div>";
  contenedor.innerHTML = html;
}