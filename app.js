const publicKey = "1a42c8351bfeecbe486fbaf76a0bdaaf";
const privateKey = "28546d1565fb610d445047ee5409883b002faab6";
const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`;

fetch(url)
  .then((resp) => resp.json())
  .then((json) => console.log(json));
