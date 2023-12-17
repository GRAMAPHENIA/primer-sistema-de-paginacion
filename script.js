document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 2;
  let data = [];

  const contentContainer = document.getElementById("content");
  const paginationContainer = document.getElementById("pagination");

  async function fetchData() {
    try {
      const response = await fetch("data/data.json");
      data = await response.json();
      displayData(1);
      updatePagination(1);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }

  function displayData(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);

    contentContainer.innerHTML = pageData
      .map(
        (item) => `
        <section class="books">
          <div class="book">
            <h3 class="titulo-portada">${item.titulo}</h3>
            <img class="imagen" src="${item.foto_de_portada}" alt="${item.titulo}">
            <div class="contenedor-parrafo">
              <p class="parrafo">${item.descripcion}</p>
            </div>
          </div>
        </section>
        `
      )
      .join("");

    // Agrega la clase 'loaded' a las imágenes después de que se carga la página
    const images = document.querySelectorAll(".imagen");
    images.forEach((img) => {
      img.addEventListener("load", function () {
        img.classList.add("loaded");
      });
    });
  }

  function updatePagination(currentPage) {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Botón de retroceso
    if (currentPage > 1) {
      addPaginationButton("←", currentPage - 1);
    }

    // Texto que indica la página actual y el total de páginas
    addPaginationText(`${currentPage} de ${totalPages}`, "paginacion-centro");

    // Botón de avance
    if (currentPage < totalPages) {
      addPaginationButton("→", currentPage + 1);
    }
  }

  function addPaginationButton(label, pageNum) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.classList.add("pagination-btn");
    btn.textContent = label;

    btn.addEventListener("click", function () {
      displayData(pageNum);
      updatePagination(pageNum);
    });

    paginationContainer.appendChild(btn);
  }

  function addPaginationText(text, className) {
    const textContainer = document.createElement("div");
    textContainer.classList.add("pagination-text", className);
    textContainer.textContent = text;
    paginationContainer.appendChild(textContainer);
  }

  fetchData();
});
