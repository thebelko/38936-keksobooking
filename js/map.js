'use strict';

var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var LODGES_TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES_TYPE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ESC = 27;
var ENTER = 13;

var tokyoBlock = document.querySelector('.tokyo');
var pinMap = tokyoBlock.querySelector('.tokyo__pin-map');
var offerDialogBlock = tokyoBlock.querySelector('#offer-dialog');
var offerDialogCloseBtn = offerDialogBlock.querySelector('.dialog__close');
var offerDialogAvatar = tokyoBlock.querySelector('.dialog__title img');

var offerDialogTemplate = document.querySelector('#lodge-template').content;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrItem = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var isEscPressed = function (evt) {
  return evt.keyCode === ESC;
};

var isEnterPressed = function (evt) {
  return evt.keyCode === ENTER;
};

var getRandomFeatures = function () {
  var randomFeatures = [];
  var randomNumber = getRandomNumber(1, 7);
  var featuresTypeCopy = FEATURES_TYPE.slice();

  for (var i = 0; i < randomNumber; i++) {
    var feature = getRandomArrItem(featuresTypeCopy);
    randomFeatures.push(feature);
    featuresTypeCopy.splice(featuresTypeCopy.indexOf(feature), 1);
  }

  return randomFeatures;
};

var getRandomLocation = function () {
  return {
    x: getRandomNumber(300, 901),
    y: getRandomNumber(300, 501)
  };
};

var renderFeature = function (featureName) {
  var newFeature = document.createElement('span');

  newFeature.classList.add('feature__image', 'feature__image--' + featureName);

  return newFeature;
};

var renderFeatures = function (featuresArr) {
  var fragment = document.createDocumentFragment();

  featuresArr.forEach(function (item) {
    fragment.appendChild(renderFeature(item));
  });

  return fragment;
};

var getAdvert = function (i) {
  var advert = {
    author: {},
    offer: {},
    location: {}
  };

  advert.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

  advert.location = getRandomLocation();

  advert.offer.title = ADVERT_TITLES[i];
  advert.offer.price = getRandomNumber(1000, 1000001);
  advert.offer.type = getRandomArrItem(HOUSE_TYPE);
  advert.offer.rooms = getRandomNumber(1, 6);
  advert.offer.guests = getRandomNumber(1, 9);
  advert.offer.checkin = getRandomArrItem(CHECK_TIMES);
  advert.offer.checkout = getRandomArrItem(CHECK_TIMES);
  advert.offer.description = '';
  advert.offer.photos = [];
  advert.offer.features = getRandomFeatures();
  advert.offer.address = advert.location.x + ', ' + advert.location.y;

  return advert;
};

var getAdverts = function (advertsQuantity) {
  var adverts = [];

  for (var i = 0; i < advertsQuantity; i++) {
    adverts.push(getAdvert(i));
  }

  return adverts;
};

var renderPin = function (advert) {
  var pin = document.createElement('div');

  pin.classList.add('pin');
  pin.innerHTML = '<img src="' + advert.author.avatar + '"  class="rounded" width="40" height="40">';
  pin.tabIndex = 0;
  pin.style.left = advert.location.x + 'px';
  pin.style.top = advert.location.y + 'px';
  pin.style.transform = 'translate(' + -pin.offsetWidth / 2 + 'px,' + -pin.offsetHeight + 'px)';

  pin.addEventListener('click', function (evt) {
    openOfferDialog(advert);
    addActivePin(evt.currentTarget);
  });

  pin.addEventListener('keydown', function (evt) {
    if (isEnterPressed(evt)) {
      addActivePin(evt.target);
      openOfferDialog(advert);
    }
  });

  return pin;
};

var renderPins = function (adverts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }

  pinMap.appendChild(fragment);
};

var renderOfferDialog = function (lodge) {
  var lodgeBlock = offerDialogTemplate.cloneNode(true);
  var lodgeFeaturesBlock = lodgeBlock.querySelector('.lodge__features');

  lodgeBlock.querySelector('.lodge__title').textContent = lodge.offer.title;
  lodgeBlock.querySelector('.lodge__address').textContent = lodge.offer.address;
  lodgeBlock.querySelector('.lodge__price').innerHTML = lodge.offer.price + '&#x20bd;/ночь';
  lodgeBlock.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests + ' гостей в ' + lodge.offer.rooms + ' комнатах';
  lodgeBlock.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;
  lodgeBlock.querySelector('.lodge__description').textContent = lodge.offer.description;
  lodgeBlock.querySelector('.lodge__type').textContent = LODGES_TYPES[lodge.offer.type];
  lodgeFeaturesBlock.appendChild(renderFeatures(lodge.offer.features));

  return lodgeBlock;
};

var openOfferDialog = function (advert) {
  var offerDialogPanel = tokyoBlock.querySelector('.dialog__panel');

  offerDialogAvatar.src = advert.author.avatar;
  offerDialogBlock.replaceChild(renderOfferDialog(advert), offerDialogPanel);
  offerDialogBlock.classList.remove('dialog--hidden');

  document.addEventListener('keydown', offerDialogEscPressHandler);
};

var closeOfferDialog = function () {
  offerDialogBlock.classList.add('dialog--hidden');

  document.removeEventListener('keydown', offerDialogEscPressHandler);
};

var offerDialogEscPressHandler = function (evt) {
  if (isEscPressed(evt)) {
    closeOfferDialog();
    removeActivePin();
  }
};

var removeActivePin = function () {
  var activePin = pinMap.querySelector('.pin.pin--active');

  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

var addActivePin = function (clickedPin) {
  removeActivePin();
  clickedPin.classList.add('pin--active');
};


renderPins(getAdverts(8));


offerDialogCloseBtn.addEventListener('click', function () {
  closeOfferDialog();
  removeActivePin();
});

offerDialogCloseBtn.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    closeOfferDialog();
    removeActivePin();
  }
});
