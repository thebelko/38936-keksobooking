'use strict';

window.renderPins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  return function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.render(adverts[i]));
    }

    pinMap.appendChild(fragment);
  };
})();

window.renderPins(window.getAdverts(8));
