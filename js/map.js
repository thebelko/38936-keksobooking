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

(function () {
  var pinMain = document.querySelector('.pin__main');
  var addressInput = document.querySelector('#address');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.transform = 'translate(' + -pinMain.offsetWidth / 2 + 'px,' + -pinMain.offsetHeight + 'px)';

      addressInput.value = 'x:' + pinMain.style.left + ', y:' + pinMain.style.top;
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  });
})();
