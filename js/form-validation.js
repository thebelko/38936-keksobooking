'use strict';

var LODGE_TYPES = {
  shack: {
    minPrice: 0
  },
  flat: {
    minPrice: 1000
  },
  palace: {
    minPrice: 10000
  }
};

var ROOM_NUMBERS = {
  1: {
    capacity: 0
  },
  2: {
    capacity: 3
  },
  100: {
    capacity: 3
  }
};

var formBlock = document.querySelector('.notice__form');
var titleInput = formBlock.querySelector('#title');
var lodgeTypeSelect = formBlock.querySelector('#type');
var priceInput = formBlock.querySelector('#price');
var timeInSelect = formBlock.querySelector('#time');
var timeOutSelect = formBlock.querySelector('#timeout');
var roomNumberSelect = formBlock.querySelector('#room_number');
var capacitySelect = formBlock.querySelector('#capacity');
var formSubmitBtn = formBlock.querySelector('.form__submit');

lodgeTypeSelect.addEventListener('change', function (evt) {
  priceInput.min = priceInput.placeholder = LODGE_TYPES[evt.target.value].minPrice;
});

roomNumberSelect.addEventListener('change', function (evt) {
  capacitySelect.value = ROOM_NUMBERS[evt.target.value].capacity;
});

timeInSelect.addEventListener('change', function (evt) {
  timeOutSelect.value = evt.target.value;
});

formSubmitBtn.addEventListener('click', function () {
  titleInput.classList.toggle('form-error', !titleInput.validity.valid);
  priceInput.classList.toggle('form-error', !priceInput.validity.valid);
});
