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

// element = document.getElementById("animate");

// if (element) {
//   // reset the transition by...
//   element.addEventListener(
//     "click",
//     function (e) {
//       e.preventDefault;

//       console.log("element", element.classList);

//       // removing the class
//       element.classList.remove("run-animation");

//       // triggering reflow
//       void element.offsetWidth;

//       // and re-adding the class
//       element.classList.add("run-animation");
//     },
//     false
//   );
// }
