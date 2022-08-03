document.addEventListener("DOMContentLoaded", () => {
  pintarPage();
});

fetchData = async (page) => {
  try {
    loading(true);
    const resp = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + page
    );
    const data = await resp.json();

    pintarCards(data.results);
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
  }
};
// LOADING
const loading = (estado) => {
  const load = document.querySelector("#loading");

  if (estado) {
    load.classList.remove("d-none");
  } else {
    load.classList.add("d-none");
  }
};

// PINTAR CARDS
const pintarCards = (data) => {
  const container = document.querySelector(".card-container");
  const templateCards = document.querySelector("#template-cards").content;
  const fragment = document.createDocumentFragment();

  data.forEach((el) => {
    const clone = templateCards.cloneNode(true);
    clone.querySelector("h5").textContent = el.name;
    clone.querySelector("p").textContent = el.species;
    clone.querySelector("img").setAttribute("src", el.image);
    fragment.appendChild(clone);
  });

  container.appendChild(fragment);
};

// -- remove cards --
const removeCards = () => {
  const cards = document.querySelectorAll(".article");
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
};

// PAGINACION

const pageOne = document.querySelector("#pageOne");
const pageTwo = document.querySelector("#pageTwo");
const pageThree = document.querySelector("#pageThree");

let page = 1;
const pages = 42;

const pintarPage = () => {
  const firstPage = document.querySelector("#firstPage");
  firstPage.addEventListener("click", () => {
    if (page > 1) {
      page = 1;
      removeCards();
      fetchData(page);
      navPage();
    }
  });

  const lastPage = document.querySelector("#lastPage");
  lastPage.addEventListener("click", () => {
    if (page < 42) {
      page = pages;
      removeCards();
      fetchData(page);
      navPage();
    }
  });

  pageOne.addEventListener("click", () => {
    if (page < 3) {
      page = 1;
      removeCards();
      fetchData(page);
      navPage();
    } else {
      page--;
      removeCards();
      fetchData(page);
      navPage();
    }
  });

  pageTwo.addEventListener("click", () => {
    if (page < 3) {
      page = 2;
      removeCards();
      fetchData(page);
    }
  });

  pageThree.addEventListener("click", () => {
    if (page < 3) {
      page = 3;
      removeCards();
      fetchData(page);
      navPage();
    } else if (page === 42) {
      return;
    } else {
      page++;
      removeCards();
      fetchData(page);
      navPage();
    }
  });

  fetchData(page);
};

const navPage = () => {
  pageOne.textContent = page - 1;
  pageTwo.textContent = page;
  pageThree.textContent = page + 1;

  firstPage.addEventListener("click", () => {
    pageOne.textContent = 1;
    pageTwo.textContent = 2;
    pageThree.textContent = 3;
  });
  if (page === 42) {
    pageOne.textContent = 41;
    pageTwo.textContent = 42;
    pageThree.textContent = "...";
  }
};

// BUSCADOR

fetchPage = async (pagina) => {
  const resp = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + pagina
  );
  const data = await resp.json();
  return data;
};

// const buscarPersonaje = async () => {
//   const personajes = async (pag) => {
//     return await fetchPage(pag);
//   };

//   let array = [];
//   for (let i = 0; i < pages; i++) {
//     array.push(await personajes(i));
//   }

//   array.forEach((e) => {
//     for (let i = 0; i < e.results.length; i++) {
//       //console.log(e.results[i].name);
//       buscador.addEventListener("input", () => {
//         const value = buscador.value.toLowerCase();
//         const name = e.results[i].name.toLowerCase();

//         removeCards();

//         if (name.indexOf(value) !== -1) {
//           // console.log(name);
//           //console.log([e.results[i]]);
//           //pintarCards(e.results[i]);
//         }
//       });
//     }
//   });
// };

const filtro = async () => {
  const btnBuscar = document.querySelector("#iniciar-busqueda");
  const btnReiniciar = document.querySelector("#reiniciar-busqueda");

  const personajes = async (pag) => {
    return await fetchPage(pag);
  };

  let array = [];
  for (let i = 0; i <= pages; i++) {
    array.push(await personajes(i));
  }

  btnBuscar.addEventListener("click", () => {
    const buscador = document
      .querySelector("#floatingInput")
      .value.toLowerCase();

    removeCards();

    array.forEach((e) => {
      const result = e.results;

      for (let i = 0; i < result.length; i++) {
        const names = Object.values(result[i].name).join("").toLowerCase();
        if (names.indexOf(buscador) !== -1) {
          // pasamos el resultado dentro de un array para que lo lea el forEach
          pintarCards([e.results[i]]);
        }
      }
    });
  });

  btnReiniciar.addEventListener("click", () => {
    removeCards();
    pintarPage();
  });
};

//buscarPersonaje();
filtro();
