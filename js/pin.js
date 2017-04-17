'use strict';

window.pin = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var renderPin = function (advert) {
    var pin = document.createElement('div');

    pin.classList.add('pin');
    pin.innerHTML = '<img src="' + advert.author.avatar + '"  class="rounded" width="40" height="40">';
    pin.tabIndex = 0;
    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';
    pin.style.transform = 'translate(' + -pin.offsetWidth / 2 + 'px,' + -pin.offsetHeight + 'px)';

    pin.addEventListener('click', function (evt) {
      addActivePin(evt.currentTarget);
      window.offerDialog.open(advert);
    });

    pin.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        addActivePin(evt.target);
        window.offerDialog.open(advert);
      }
    });

    return pin;
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

  return {
    render: renderPin,
    removeActive: removeActivePin,
    addActive: addActivePin
  };
})();
