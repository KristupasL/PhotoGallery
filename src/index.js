const smallPhotos = document.querySelector("#smallPhotos");
const bigPhoto = document.querySelector("#bigPhoto");
const photos = [];

function loadImages(photoArray) {
  photoArray.forEach(obj => {
    const img = document.createElement("img");

    img.setAttribute("src", `https://picsum.photos/id/${obj.id}/200`);
    img.setAttribute("id", obj.id);

    smallPhotos.appendChild(img);
  });
}

function displayLargeImage(target) {
  bigPhoto.innerHTML = "";

  const img = document.createElement("img");
  const author = document.createElement("p");
  const height = document.createElement("p");
  const width = document.createElement("p");

  author.innerHTML = `<b>Author</b> : ${target.author}`;
  height.innerHTML = `<b>Height</b> : ${target.height}px`;
  width.innerHTML = `<b>Width</b> : ${target.width}px`;

  img.setAttribute("src", target.download_url);
  img.setAttribute("height", "79%");

  bigPhoto.appendChild(author);
  bigPhoto.appendChild(height);
  bigPhoto.appendChild(width);
  bigPhoto.appendChild(img);
}

smallPhotos.addEventListener("click", event => {
  const id = event.target.id;
  const photoInfo = photos.filter(elem => elem.id == id);

  displayLargeImage(photoInfo[0]);
});

fetch("https://picsum.photos/v2/list")
  .then(resp => resp.json())
  .then(result => {
    loadImages(result);
    result.forEach(elem => photos.push(elem));
  })
  .catch(err => alert(err));
