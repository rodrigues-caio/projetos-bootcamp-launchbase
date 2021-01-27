const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modalButtonClose = document.querySelector('.close-modal');
const iframe = document.querySelector('iframe');

for (let card of cards) {
  card.addEventListener('click', () => {
    iframe.src = `https://www.youtube.com/embed/${card.id}`;

    modalOverlay.classList.add('active');
  });
}

modalButtonClose.addEventListener('click', () => {
  iframe.src = '';

  modalOverlay.classList.remove('active');
});
