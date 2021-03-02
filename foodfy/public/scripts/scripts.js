const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', () => {
    window.location.href = `/recipes/${card.id}`;
  });
}

/* === recipe button */

const button = document.querySelector('.button-prepare');
const ol = document.querySelector('.content ol');

button.addEventListener('click', () => {
  ol.classList.toggle('desactive');

  button.innerHTML === 'Esconder'
    ? (button.innerHTML = 'Mostrar')
    : (button.innerHTML = 'Esconder');
});

const buttonIngredients = document.querySelector('.button-ingredient');
const ul = document.querySelector('.content ul');

buttonIngredients.addEventListener('click', () => {
  ul.classList.toggle('desactive');

  buttonIngredients.innerHTML === 'Esconder'
    ? (buttonIngredients.innerHTML = 'Mostrar')
    : (buttonIngredients.innerHTML = 'Esconder');
});

const buttonInformation = document.querySelector('.button-information');
const p = document.querySelector('.content p');

buttonInformation.addEventListener('click', () => {
  p.classList.toggle('desactive');

  buttonInformation.innerHTML === 'Esconder'
    ? (buttonInformation.innerHTML = 'Mostrar')
    : (buttonInformation.innerHTML = 'Esconder');
});

const buttonDelete = document.querySelector('.delete-button');

buttonDelete.addEventListener('click', () => {
  const confirm = confirm('Deseja exluir?');

  if (!confirm) {
    window.location('/admin/chefs');
  }
});
