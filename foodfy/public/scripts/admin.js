function addIngredient() {
  const ingredients = document.querySelector('.ingredients');
  const containerIngredients = document.querySelectorAll('.ingredient');

  const newField = containerIngredients[
    containerIngredients.length - 1
  ].cloneNode(true);

  if (newField.children[0].value == '') {
    return false;
  }

  newField.children[0].value = '';

  ingredients.appendChild(newField);
}

const addIngredients = document.querySelector('#add-ingredient');
addIngredients.addEventListener('click', addIngredient);

/* === PREPARE === */

function addPrepare() {
  const prepareContainer = document.querySelector('.prepare-container');
  const prepareFields = document.querySelectorAll('.prepare');

  const newFieldPrepare = prepareFields[prepareFields.length - 1].cloneNode(
    true
  );

  if (newFieldPrepare.children[0].value == '') {
    return false;
  }

  newFieldPrepare.children[0].value = '';
  prepareContainer.appendChild(newFieldPrepare);
}

document.querySelector('#add-prepare').addEventListener('click', addPrepare);
