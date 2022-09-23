const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";
const privateKey = "28546d1565fb610d445047ee5409883b002faab6";
const baseUrl = `http://gateway.marvel.com/v1/public/`;
let offSet = 0;

// selectComics;
// const elements = (el) => {
//   document.querySelector(el);
// };

// const getSearchParams = (isSearch) => {
//   let searchParams = `?apikey=${publicKey}&offSet=${offSet}`;
//   const type = elements("#select-tipo").value;
// };

const element = document.getElementById("animate");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");
const body = document.getElementById("body");
const comicSection = document.getElementById("comic-section");
const characterSection = document.getElementById("character-section");
const selectComics = document.getElementById("select-tipo");
const selectCharacters = document.getElementById("select-type");

// const getData = () => {
//   const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`;

//   fetch(url)
//     .then((resp) => resp.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error(err));
// };
// getData();

const searchType =  document.querySelector('#select-tipo')

const getSearchParmas = (inSearch) => {
  let url = baseUrl;
  // console.log(elemento('#select-tipo').value)
  let searchParamas = `?apikey=${publicKey}&offset=${offSet}`
  if(searchType.value === 'comics'){
      url += `${searchType.value}${searchParamas}`;
      fetch(url)
      .then(resp =>resp.json())
       .then(json => printComics(json))
       .catch(err => console.error(err))
  }
  if(searchType.value === 'characters'){
      url += `${searchType.value}${searchParamas}`;
      fetch(url)
      .then(resp =>resp.json())
       .then(json => printPersonaje(json))
       .catch(err => console.error(err))
  }
  console.log(url)

};
getSearchParmas()

const btnBuscar = document.getElementById('btn-buscar')
const boxResults = document.getElementById('box-results')

btnBuscar.addEventListener('click', () => {
    getSearchParmas()
})

const  printComics = (json) => {
  let results =  json.data.results
  console.log(results)
  let card = ''
  results.forEach(element => {
      const {title,thumbnail} = element
      card += `
      <div class="cuadros2 margen-derecho" >
      <div class="cuadros">
      <img
        src="${thumbnail.path}.${thumbnail.extension}"
      />
      </div>
      ${title}
      </div>`
  });
  boxResults.innerHTML = card
};

const printPersonaje = (json) => {
  let results =  json.data.results
  console.log(results)
  let card = ''
  results.forEach(element => {
      const {name,thumbnail} = element
      card += `<div class="card card-personaje" style="width: 180px;">
      <img src="${thumbnail.path}.${thumbnail.extension}" class="card-img-top imagen" alt="...">
      <div class="card-body nombre-personaje text-white fw-bold text-uppercase border-top border-danger border-4" style="height: 140px;">
        <p class="card-text">${name}</p>
      </div>
    </div>`
  });
  boxResults.innerHTML = card
};



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

const inicio = document.getElementById("enter-btn"); //btn enter
const presentation = document.getElementById("presentation-container");

inicio.addEventListener("click", () => {
  presentation.classList.add("d-none");
  header.classList.remove("d-none");
  main.classList.remove("d-none");
  footer.classList.remove("d-none");
  body.style.background = "white";
  body.style.backgroundImage = "white";
});

// Vistas secciones

const divComicSelect = document.getElementById("div-select-comics");
const divCharacterSelect = document.getElementById("div-select-character");
const selectType = document.getElementById("select-tipo");

selectType.addEventListener("click", (e) => {
  if (e.target.value === "COMICS") {
    divComicSelect.classList.remove("d-none");
    divCharacterSelect.classList.add("d-none");
  } else if (e.target.value === "PERSONAJES") {
    divCharacterSelect.classList.remove("d-none");
    divComicSelect.classList.add("d-none");
  }
});

// Paginator

// const paginaActual = document.getElementById("pagina-actual");
// const totalPaginas = document.getElementById("total-paginas");
// const nextPage = document.getElementById("next-page");
// const firstPage = document.getElementById("first-page");
// const previusPage = document.getElementById("previus-page");
// const lastPage = document.getElementById("last-page");

// let pagina = 1;
// let total = 0;

// const pagination = async (promesa) => {
//   const result = await promesa;
//   nextPage.addEventListener("click", () => {
//     pagina += 1;
//     getData();
//   });
//   previusPage.addEventListener("click", () => {
//     pagina -= 1;
//     getData();
//   });
//   lastPage.addEventListener("click", () => {
//     if (pagina < result.info.pages) {
//       pagina = result.info.pages;
//       getData();
//     }
//   });
//   firstPage.addEventListener("click", () => {
//     if (pagina > 2) {
//       pagina = 1;
//       getData();
//     }
//   });
// };

// const updatePagination = () => {
//   if (pagina <= 1) {
//     previusPage.disabled = true;
//     firstPage.disabled = true;
//   } else {
//     previusPage.disabled = false;
//     firstPage.disabled = false;
//   }
//   if (pagina === total) {
//     nextPage.disabled = true;
//     lastPage.disabled = true;
//   } else {
//     nextPage.disabled = false;
//     lastPage.disabled = false;
//   }
// };

// const pagination = async (promesa) => {
//   const result = await promesa;
//   nextPage.addEventListener("click", () => {
//     pagina += 1;
//     getData();
//   });
//   previusPage.addEventListener("click", () => {
//     pagina -= 1;
//     getData();
//   });
//   lastPage.addEventListener("click", () => {
//     if (pagina < result.info.pages) {
//       pagina = result.info.pages;
//       getData();
//     }
//   });
//   firstPage.addEventListener("click", () => {
//     if (pagina > 2) {
//       pagina = 1;
//       getData();
//     }
//   });
// };

// const updatePagination = () => {
//   if (pagina <= 1) {
//     previusPage.disabled = true;
//     firstPage.disabled = true;
//   } else {
//     previusPage.disabled = false;
//     firstPage.disabled = false;
//   }
//   if (pagina === total) {
//     nextPage.disabled = true;
//     lastPage.disabled = true;
//   } else {
//     nextPage.disabled = false;
//     lastPage.disabled = false;
//   }
// };

// $(document).ready(function () {
//   $(".dropdown-trigger").dropdown();
//   pagination(getData());
//   updatePagination();
// });
