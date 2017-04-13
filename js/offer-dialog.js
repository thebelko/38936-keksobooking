'use strict';

window.offerDialog = (function () {
  var LODGES_TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var tokyoBlock = document.querySelector('.tokyo');
  var offerDialogTemplate = document.querySelector('#lodge-template').content;
  var offerDialogBlock = tokyoBlock.querySelector('#offer-dialog');
  var offerDialogCloseBtn = offerDialogBlock.querySelector('.dialog__close');
  var offerDialogAvatar = tokyoBlock.querySelector('.dialog__title img');

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

  var offerDialogEscPressHandler = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeOfferDialog();
      window.pin.removeActive();
    }
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

  offerDialogCloseBtn.addEventListener('click', function () {
    closeOfferDialog();
    window.pin.removeActive();
  });

  offerDialogCloseBtn.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeOfferDialog();
      window.pin.removeActive();
    }
  });

  return {
    render: renderOfferDialog,
    open: openOfferDialog,
    close: closeOfferDialog
  };
})();
