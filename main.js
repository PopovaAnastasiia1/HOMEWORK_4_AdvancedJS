const API = "https://ajax.test-danit.com/api/swapi/films";

sendRequest(API)
  .then((response) => response.json())
  .then((data) => {
    renderFilms(data);
    return data;
  })
  .catch((error) => console.error(error));

function sendRequest(url) {
  return fetch(url);
}

function renderFilms(data) {
  data.forEach(({ characters, episodeId, name, openingCrawl }) => {
    const container = document.createElement("div");
    container.innerHTML = `
        <h1>Episode ${episodeId}: ${name}</h1>
        <div class="loader"><div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div></div>
        <ol class="characters-list"></ol>
        <p>${openingCrawl}</p>
      `;
    document.body.append(container);

    showCharacters();

    function showCharacters() {
      const charactersList = container.querySelector(".characters-list");
      const loader = container.querySelector(".loader");

      Promise.all(
        characters.map((url) => fetch(url).then((response) => response.json()))
      )
        .then((characters) => {
          charactersList.innerHTML = characters
            .map((character) => `<li>${character.name}</li>`)
            .join("");
          loader.style.display = "none";
        })
        .catch((error) => {
          console.error(error);
          charactersList.innerHTML = "<li>Error loading characters</li>";
          loader.style.display = "none";
        });
    }
  });
}
