export function makeImages(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="list-item">
  <a href="${largeImageURL}" alt="${tags}" title="">
    <img src="${webformatURL}" alt="${tags}" class="img-item">
  <div class="list-container">
  <p class="item"><span class="item-text">Likes</span> <span>${likes}</span></p>
  <p class="item"><span class="item-text">Wiews</span> <span>${views}</span></p>
  <p class="item"><span class="item-text">Comments</span> <span>${comments}</span></p>
  <p class="item"><span class="item-text">Downlods</span> <span>${downloads}</span></p>
  </div></a>
</li>`
    )
    .join('');
}
