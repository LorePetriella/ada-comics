//ANIMATION ELEMENTS
const element = document.getElementById("animate");
const init = document.getElementById("enter-btn"); //btn enter
const presentation = document.getElementById("presentation-container");

//MAIN SECTIONS
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const comicSection = document.getElementById("section-comics");
const comicsGroup = document.getElementById("comics-result");
const characterSection = document.getElementById("section-personajes");

//SEARCH NAV
const divComicSelect = document.getElementById("div-select-comics");
const divCharacterSelect = document.getElementById("div-select-character");
const selectOrderComics = document.getElementById("select-order-comics");
const selectOrderCharacters = document.getElementById(
  "select-order-characters"
);
const selectType = document.getElementById("select-tipo");
const inputSearch = document.getElementById("input-search");
const btnSearch = document.querySelector("#btn-search");

//SECTION RESULTS ELEMENTS
const resultsCounter = document.getElementById("results-counter");
const resultsNumber = document.querySelector(".results-number");
const resultsTitle = document.getElementById("results-title");
const cardGroup = document.getElementById("card-group");
// const charactersCards = document.getElementById("character-group");

//PAGINATOR ELEMENTS
const firstPage = document.getElementById("first");
const previousPage = document.getElementById("previous");
const lastPage = document.getElementById("last");
const nextPage = document.getElementById("next");
const currentPageDiv = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");

//elementos comic section

const comicImg = document.querySelector(".comic-cover");
const comicTitle = document.querySelector(".comic-title");
const comicReleaseDate = document.querySelector(".comic-release-date");
const comicWriters = document.querySelector(".comic-writers");
const comicDescription = document.querySelector(".comic-description");

// ELEMENTOS CHARACTER SECTION

const characterImg = document.querySelector(".character-img");
const characterName = document.querySelector(".character-name");
const characterDescription = document.querySelector(".character-description");
const loaderContainer = document.querySelector(".loader-container");

//FOOTER ELEMENTS

const btnLore = document.getElementById("lore");
const btnStefa = document.getElementById("stefa");
const contactLore = document.getElementById("contact-lore");
const contactStefa = document.getElementById("contact-stefa");
const loreGithub = document.getElementById("lore-github");
const loreLinkedin = document.getElementById("lore-linkedin");
const stefaGithub = document.getElementById("stefa-github");
const stefaLinkedin = document.getElementById("stefa-linkedin");

// Animación logo

if (element) {
  // reset the transition by...
  element.addEventListener(
    "click",
    function (e) {
      e.preventDefault;

      // removing the class
      element.classList.remove("run-animation");

      // triggering reflow
      void element.offsetWidth;

      // and re-adding the class
      element.classList.add("run-animation");
    },
    false
  );
}

if (element.classList.contains("run-animation")) {
  header.classList.add("d-none");
  main.classList.add("d-none");
  footer.classList.add("d-none");
}

init.addEventListener("click", () => {
  presentation.classList.add("d-none");
  header.classList.remove("d-none");
  main.classList.remove("d-none");
  footer.classList.remove("d-none");
  body.style.background = "white";
  body.style.backgroundImage = "white";
});

// Vistas secciones

selectType.addEventListener("click", (e) => {
  if (e.target.value === "comics") {
    divComicSelect.classList.remove("d-none");
    divCharacterSelect.classList.add("d-none");
  } else if (e.target.value === "characters") {
    divCharacterSelect.classList.remove("d-none");
    divComicSelect.classList.add("d-none");
  }
});

//VISTAS FOOTER

// const btnLore = document.getElementById("lore");
// const btnStefa = document.getElementById("stefa");
// const contactLore = document.getElementById("lore-contact");
// const contactStefa = document.getElementById("lore-stefa-contact");

btnLore.addEventListener("click", () => {
  contactLore.classList.remove("d-none");
  contactStefa.classList.add("d-none");
  loreGithub.classList.add("text-danger");
  loreGithub.classList.remove("text-light");
  loreLinkedin.classList.add("text-danger");
  loreLinkedin.classList.remove("text-light");
});

btnStefa.addEventListener("click", () => {
  contactLore.classList.add("d-none");
  contactStefa.classList.remove("d-none");
  stefaGithub.classList.add("text-danger");
  stefaGithub.classList.remove("text-light");
  stefaLinkedin.classList.add("text-danger");
  stefaLinkedin.classList.remove("text-light");
});

//LOADER

const hideLoader = () => loaderContainer.classList.add("d-none");
const showLoader = () => loaderContainer.classList.remove("d-none");

const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";
const privateKey = "28546d1565fb610d445047ee5409883b002faab6";
const baseUrl = `https://gateway.marvel.com/v1/public/`;
// const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}`;
let offSet = 0;
let resultsCount = 0;

const searchByName = (isSearch, resourse) => {
  if (inputSearch.value && isSearch && resourse === "comics") {
    return `?titleStartsWith=${inputSearch.value}`;
  } else if (inputSearch.value && isSearch && resourse === "characters") {
    return `?nameStartsWith=${inputSearch.value}`;
  } else {
    return "";
  }
};

const OrderResults = (isSearch, resourse) => {
  if (isSearch && resourse === "comics") {
    return `${inputSearch.value ? "&" : "?"}orderBy=${selectOrderComics.value}`;
  } else if (isSearch && resourse === "characters") {
    return `${inputSearch.value ? "&" : "?"}orderBy=${
      selectOrderCharacters.value
    }`;
  } else {
    return "";
  }
};

//Retorna última parte de la URL-------------------------------------------------------------
const getSearchParams = (isSearch) => {
  // let url = baseUrl;
  let searchParamsId = `?apikey=${publicKey}&offset=${offSet}`; //Retorna esta parte de la URL
  let searchParams = `&offset=${offSet}&apikey=${publicKey}`;
  if (!isSearch) {
    return searchParamsId;
  }
  return searchParams;
};

//Función que arma la URL------------------------------------------------------------------
const getApiUrl = (resourse, resourseId, subResourse) => {
  const isSearch = !resourseId && !subResourse;
  let url = `${baseUrl}${resourse}`;
  // console.log(url); //http://gateway.marvel.com/v1/public/comics Hasta acá tengo esta parte de la URL

  if (resourseId) {
    url += `/${resourseId}`;
  }

  if (subResourse) {
    url += `/${subResourse}`;
  }

  url += searchByName(isSearch, resourse);

  url += OrderResults(isSearch, resourse);

  url += getSearchParams(isSearch);

  return url; //Retorna API completa: http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}
};

const updateResultsCounter = (count, title) => {
  resultsNumber.innerHTML = count;
  resultsCount = count;
  resultsTitle.innerHTML = title;
  updatePaginationData(resultsCount);
};

const fetchUrl = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const fetchComics = async () => {
  showLoader();
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("comics"));
  showLoader();

  printComics(results);
  updateResultsCounter(total, "Resultados");
  hideLoader();
  updatePagination();
};

//Función para pintar los comics en las cards
const printComics = (comics) => {
  clearResults();
  if (comics.length === 0) {
    cardGroup.innerHTML =
      '<h2 class="no-lenght fw-bold fs-5">No hemos encontrado resultados</h2>';
  }

  for (const comic of comics) {
    const comicCard = document.createElement("div");
    comicCard.tabIndex = 0;
    comicCard.classList.add("comic");
    comicCard.setAttribute("id", "comics-result");
    comicCard.onclick = () => {
      fetchComic(comic.id);
      showComicDetail();
      clearResults();
      clearPageCount();
      fetchComicCharacters(comic.id);
      updatePaginationCallback(() => fetchComicCharacters(comic.id));
    };
    comicCard.innerHTML = `
    <div class="comic-img-container">
    <img src="${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
  </div>
  <p class="comic-title">${comic.title}</p>`;

    cardGroup.append(comicCard);
  }
};

const fetchComic = async (comicId) => {
  showLoader();
  const {
    data: {
      results: [comic],
    },
  } = await fetchUrl(getApiUrl("comics", comicId));

  const coverPath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
  const releaseDate = new Intl.DateTimeFormat("es-AR").format(
    new Date(comic.dates.find((date) => date.type === "onsaleDate").date)
  );

  const writers = comic.creators.items
    .filter((creator) => creator.role === "writer")
    .map((creator) => creator.name)
    .join(", ");
  updateComicDetails(
    coverPath,
    comic.title,
    releaseDate,
    writers,
    comic.description
  );
  showComicDetail();
  hideCharacterDetails();
  hideLoader();
  updatePagination();
};

const fetchComicCharacters = async (comicId) => {
  showLoader();
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("comics", comicId, "characters"));
  updateResultsCounter(total, "Personajes");

  printCharacters(results);
  hideLoader();
  updatePagination();
  hideCharacterDetails();
};

const updateComicDetails = (img, title, releaseDate, writers, description) => {
  comicImg.src = img;
  comicTitle.innerHTML = title;
  comicReleaseDate.innerHTML = releaseDate;
  comicWriters.innerHTML = writers;
  comicDescription.innerHTML = description;
};

const showComicDetail = () => {
  comicSection.classList.remove("d-none");
};

const hideComicDetail = () => {
  comicSection.classList.add("d-none");
};

const hideCards = () => {
  cardGroup.classList.add("d-none");
};

const showCards = () => {
  cardGroup.classList.remove("d-none");
};
// CHARACTERS

const fetchCharacters = async () => {
  showLoader();
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("characters"));
  console.log(results);

  printCharacters(results);
  updateResultsCounter(total, "Resultados");
  hideLoader();
  updatePagination();
};

const printCharacters = (characters) => {
  clearResults();
  if (characters.length === 0) {
    cardGroup.innerHTML =
      '<h2 class="no-lenght fw-bold fs-5">No hemos encontrado resultados</h2>';
  }

  for (const character of characters) {
    const characterCard = document.createElement("div");
    characterCard.tabIndex = 0;

    characterCard.classList.add("comic");
    characterCard.onclick = () => {
      fetchCharacter(character.id);
      showCharacterDetails();
      clearResults();
      clearPageCount();
      fetchCharacterComics(character.id);
      updatePaginationCallback(() => fetchCharacterComics(character.id));
    };
    characterCard.innerHTML = `<div id="box-results" class="d-flex flex-wrap ">
  <div class="card card-personaje">
    <img src="${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}" class="card-img-top imagen" alt="${character.name}">
    <div class="card-body nombre-personaje text-white fw-bold text-uppercase border-top border-danger border-4">
      <p class="card-text">${character.name}</p>
    </div>
  </div>
</div> `;

    cardGroup.append(characterCard);
  }
};

const fetchCharacter = async (characterId) => {
  showLoader();
  const {
    data: {
      results: [character],
    },
  } = await fetchUrl(getApiUrl("characters", characterId));
  const coverPath = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  characterDetails(character.name, coverPath, character.description);
  hideComicDetail();
  hideLoader();
  updatePagination();
};

const characterDetails = (name, image, description) => {
  characterImg.src = image;
  characterName.innerHTML = name;
  characterDescription.innerHTML = description;
};

const showCharacterDetails = () => {
  characterSection.classList.remove("d-none");
};

const hideCharacterDetails = () => {
  characterSection.classList.add("d-none");
};

const fetchCharacterComics = async (characterId) => {
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("characters", characterId, "comics"));
  printComics(results);

  updateResultsCounter(total, "Comics");
  updatePagination();
};

const search = () => {
  if (selectType.value == "comics") {
    fetchComics();
  }
  if (selectType.value === "characters") {
    fetchCharacters();
  }
};

const clearResults = () => {
  cardGroup.innerHTML = "";
};

const clearPageCount = () => {
  currentPage = 1;
  offSet = 0;
};

let currentPage = 1;

btnSearch.addEventListener("click", () => {
  hideComicDetail();
  hideCharacterDetails();
  clearResults();
  clearPageCount();
  search();
  showCards();
  updatePaginationCallback(search);
});

//PAGINATOR

const updatePaginationCallback = (callback) => {
  firstPage.onclick = () => {
    offSet = 0;
    currentPage = 1;
    callback();
    clearResults();
  };

  previousPage.onclick = () => {
    offSet -= 20;
    currentPage -= 1;
    callback();
    clearResults();
    if (offSet < 0) {
      offSet = 0;
    }
  };

  nextPage.onclick = () => {
    offSet += 20;
    currentPage += 1;
    callback();
    clearResults();
  };

  lastPage.onclick = () => {
    const isExact = resultsCount % 20 === 0;
    const pages = Math.floor(resultsCount / 20);
    offSet = (isExact ? pages - 1 : pages) * 20;
    let totalPages = Math.ceil(resultsCount / 20);
    currentPage = totalPages;
    callback();
    clearResults();
  };
};

const updatePaginationData = (totalResults) => {
  totalPages.innerHTML = `${Math.ceil(totalResults / 20)}`;
  currentPageDiv.innerHTML = `${totalResults === 0 ? 0 : currentPage}`;
};

const updatePagination = () => {
  if (offSet === 0) {
    firstPage.disabled = true;
    previousPage.disabled = true;
  } else {
    firstPage.disabled = false;
    previousPage.disabled = false;
  }

  if (offSet + 20 >= resultsCount) {
    lastPage.disabled = true;
    nextPage.disabled = true;
  } else {
    lastPage.disabled = false;
    nextPage.disabled = false;
  }
};

const inicio = () => {
  search();
  updatePaginationCallback(search);
  getApiUrl();
  updatePagination();
};

window.onload = inicio;
