const getRandomMovie = () => {
  return Math.floor(Math.random() * Object.keys(movies).length + 1);
};

const roll = (image) => {
  const movie = movies[getRandomMovie()];
  image.setAttribute('src', `images/${movie}.jpg`);
};

(() => {
  const image = document.querySelector('.movie-image');
  const rollBtn = document.querySelector('.roll');

  roll(image);

  rollBtn.addEventListener('click', event => {
    event.preventDefault();
    roll(image);
  });
})();
