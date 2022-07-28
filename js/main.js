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

    pintarCards(data);
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

  data.results.forEach((el) => {
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
let page = 1;

const pageOne = document.querySelector("#pageOne");
const pageTwo = document.querySelector("#pageTwo");
const pageThree = document.querySelector("#pageThree");

const pintarPage = () => {
  const pages = 42;

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

  if (page < 3) {
    pageOne.addEventListener("click", () => {
      page = 1;
      removeCards();
      return fetchData(page);
    });

    pageTwo.addEventListener("click", () => {
      page = 2;
      removeCards();
      return fetchData(page);
    });

    pageThree.addEventListener("click", () => {
      page = 3;
      removeCards();
      return fetchData(page);
    });
  }

  if (page >= 2) {
    pageOne.addEventListener("click", () => {
      page--;
      removeCards();
      fetchData(page);
      navPage();
    });
    pageThree.addEventListener("click", () => {
      page++;
      removeCards();
      fetchData(page);
      navPage();
    });
  }

  fetchData(page);
};

const navPage = () => {
  pageOne.textContent = page - 1;
  pageTwo.textContent = page;
  pageThree.textContent = page + 1;
};
