const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";
const privateKey = "28546d1565fb610d445047ee5409883b002faab6";

const getData = () => {
  const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
};
getData();

// Animación logo

const element = document.getElementById("animate");
const header = document.querySelector(".header");
const main = document.querySelector("main");
const footer = document.getElementById("footer");

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
});
