const element = document.getElementById("animate");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");

const comicSection = document.getElementById("section-comics");
const characterSection = document.getElementById("section-personajes");

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search")

const divComicSelect = document.getElementById("div-select-comics");
const selectOrderComics = document.getElementById("select-order-comics");
const divCharacterSelect = document.getElementById("div-select-character");
const selectType = document.getElementById("select-tipo");

const init = document.getElementById("enter-btn"); //btn enter
const presentation = document.getElementById("presentation-container");
const resultsCounter = document.getElementById("results-counter");
const cardGroup = document.getElementById("card-group");

const firstPage = document.getElementById("first");
const previousPage = document.getElementById("previous");
const lastPage = document.getElementById("last");
const nextPage = document.getElementById("next");

const resultsNumber = document.querySelector(".results-number");

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
  let searchParamsId = `?apikey=${publicKey}&offset=${offSet}`; //Retorna esta parte de la URL
  let searchParams =   `&offset=${offSet}&apikey=${publicKey}`
  console.log(isSearch)
  if(isSearch === false){
    return searchParamsId;
  }
  //este if es para que no se queje porque no se usa

  // if (selectType.value === "comics") {
  //   searchParams += `${selectType.value}${searchParams}`;
  // }

  return searchParams
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

  if(inputSearch.value && resourse === 'comics' && !resourseId){
    url += `?titleStartsWith=${inputSearch.value}`
  }
 
  if(inputSearch.value && resourse === 'characters' && !resourseId ){
    url += `?nameStartsWith=${inputSearch.value}`
  }

  url += `${inputSearch.value ? '&' : '?'}orderBy=title`

  url += getSearchParams(isSearch);
  return url; //Retorna API completa: http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}
};
//getApiUrl("comics");

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

  printComics(results);
  updateResultsCounter(total);
};

//Función para pintar los comics en las cards
const printComics = (comics) => {
  cardGroup.innerHTML = ''
  if (comics.lenght === 0) {
    comicCard.innerHTML =
      '<h2 class="no-lenght">No hemos encontrado resultados</h2>';
  }

  for (const comic of comics) {
    const comicCard = document.createElement("div");
    comicCard.tabIndex = 0;
    comicCard.classList.add("comic");
    comicCard.onclick = () => {
      // resetOffset();
      fetchComic(comic.id);
      showComicDetail();
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
  console.log(releaseDate);
  const writers = comic.creators.items
    .filter((creator) => creator.role === "writer")
    .map((creator) => creator.name)
    .join(",");
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
  // cardGroup.classList.add("d-none");
};

const search = () => {
  if (selectType.value === "comics") {
    fetchComics();
  }
};

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

btnSearch.addEventListener('click', () => {
  search()
})

const inicio = () => {
  search();
  // updatePaginationCallback(search);
  //getApiUrl();
};

window.onload = inicio;
