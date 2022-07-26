document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

fetchData = async () => {
  try {
    loading(true);

    const resp = await fetch(
      "https://rickandmortyapi.com/api/character?page=1"
    );
    const data = await resp.json();

    pintarCards(data);
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
  }
};

const loading = (estado) => {
  const load = document.querySelector("#loading");

  if (estado) {
    load.classList.remove("d-none");
  } else {
    load.classList.add("d-none");
  }
};

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
