//ANIMATION ELEMENTS
const element = document.getElementById("animate");
const init = document.getElementById("enter-btn"); //btn enter
const presentation = document.getElementById("presentation-container");

//SECTIONS
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
const selectType = document.getElementById("select-tipo");
const searchBtn = document.querySelector("#search-btn");

//SECTRION RESULTS ELEMENTS
const resultsCounter = document.getElementById("results-counter");
const resultsNumber = document.querySelector(".results-number");
const cardGroup = document.getElementById("card-group");
// const charactersCards = document.getElementById("character-group");

//PAGINATOR ELEMENTS
const firstPage = document.getElementById("first");
const previousPage = document.getElementById("previous");
const lastPage = document.getElementById("last");
const nextPage = document.getElementById("next");

//elementos comic section

const comicImg = document.querySelector(".comic-cover");
const comicTitle = document.querySelector(".comic-title");
const comicReleaseDate = document.querySelector(".comic-release-date");
const comicWriters = document.querySelector(".comic-writers");
const comicDescription = document.querySelector(".comic-description");

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

const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";
const privateKey = "28546d1565fb610d445047ee5409883b002faab6";
const baseUrl = `http://gateway.marvel.com/v1/public/`;
// const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}`;
let offSet = 0;
let resultsCount = 0;
//Retorna última parte de la URL-------------------------------------------------------------
const getSearchParams = (isSearch) => {
  // let url = baseUrl;
  let searchParams = `?apikey=${publicKey}&offset=${offSet}`; //Retorna esta parte de la URL
  if (!isSearch) {
    return searchParams;
  } //este if es para que no se queje porque no se usa

  // if (selectType.value === "comics") {
  //   searchParams += `${selectType.value}${searchParams}`;
  // }

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
  url += getSearchParams(isSearch);
  return url; //Retorna API completa: http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}
};
getApiUrl("comics");

const updateResultsCounter = (count) => {
  resultsNumber.innerHTML = count;
  resultsCount = count;
};

const fetchUrl = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const fetchComics = async () => {
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("comics"));
  console.log(results);
  printComics(results);
  updateResultsCounter(total);
};

//Función para pintar los comics en las cards
const printComics = (comics) => {
  if (comics.lenght === 0) {
    comicCard.innerHTML =
      '<h2 class="no-lenght">No hemos encontrado resultados</h2>';
  }

  for (const comic of comics) {
    const comicCard = document.createElement("div");
    comicCard.tabIndex = 0;
    comicCard.classList.add("comic");
    comicCard.setAttribute("id", "comics-result");
    comicCard.onclick = () => {
      // resetOffset();
      fetchComic(comic.id);
      showComicDetail();
      hideCards();
      // fetchComicCharacters(comic.id);
      // updatePaginationCallback(() => fetchComicCharacters(comic.id));
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
  const {
    data: { results, total },
  } = await fetchUrl(getApiUrl("characters"));
  console.log(results);

  printCharacters(results);
  updateResultsCounter(total);
};

const printCharacters = (characters) => {
  if (characters.lenght === 0) {
    characterCard.innerHTML =
      '<h2 class="no-lenght">No hemos encontrado resultados</h2>';
  }

  for (const character of characters) {
    const characterCard = document.createElement("div");
    characterCard.tabIndex = 0;

    characterCard.classList.add("comic");
    characterCard.onclick = () => {
      // resetOffset();
      fetchCharacter(character.id);
      showCharacterDetail();
      // fetchComicCharacters(comic.id);
      // updatePaginationCallback(() => fetchComicCharacters(comic.id));
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

const search = () => {
  if (selectType.value == "comics") {
    fetchComics();
  }
};

const clearResults = () => {
  cardGroup.innerHTML = "";
};

searchBtn.addEventListener("click", () => {
  if (selectType.value === "comics") {
    hideComicDetail();
    clearResults();
    search();
    showCards();
  } else if (selectType.value === "characters") {
    hideComicDetail();
    clearResults();
    fetchCharacters();
    showCards();
  }
});

//PAGINATOR

// const updatePaginationCallback = (callback) => {
//   firstPage.onclick = () => {
//     offset = 0;
//     callback();
//   };

//   previousPage.onclick = () => {
//     offset -= 20;
//     if (offset < 0) {
//       offset = 0;
//     }
//     callback();
//   };

//   nextPage.onclick = () => {
//     offset += 20;
//     callback();
//   };

//   lastPage.onclick = () => {
//     const isExact = resultsCount % 20 === 0;
//     const pages = Math.floor(resultsCount / 20);
//     offset = (isExact ? pages - 1 : pages) * 20;
//     callback();
//   };
// };

// const updatePagination = () => {
//   if (offset === 0) {
//     firstPage.disabled = true;
//     previousPage.disabled = true;
//   } else {
//     firstPage.disabled = false;
//     previousPage.disabled = false;
//   }

//   if (offset + 20 >= resultsCount) {
//     lastPage.disabled = true;
//     nextPage.disabled = true;
//   } else {
//     lastPage.disabled = false;
//     nextPage.disabled = false;
//   }
// };

const inicio = () => {
  search();

  // updatePaginationCallback(search);
  getApiUrl();
};

window.onload = inicio();
