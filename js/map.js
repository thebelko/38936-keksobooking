'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  var renderPins = function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.render(adverts[i]));
    }

    pinMap.appendChild(fragment);
  };

  var createPinMainDrag = function () {
    var pinMain = document.querySelector('.pin__main');
    var addressInput = document.querySelector('#address');
    var mapImg = document.querySelector('.tokyo img');
    var mapCoords = mapImg.getBoundingClientRect();

    pinMain.style.transform = 'translate(' + -pinMain.offsetWidth / 2 + 'px,' + -pinMain.offsetHeight + 'px)';

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

        addressInput.value = 'x:' + pinMain.style.left + ', y:' + pinMain.style.top;

        if (moveEvt.clientY < mapCoords.bottom && (moveEvt.clientX > mapCoords.right || moveEvt.clientX < mapCoords.left)) {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        } else if (moveEvt.clientY > mapCoords.bottom) {
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        } else {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        }
      };

      var pinMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', pinMouseMoveHandler);
        document.removeEventListener('mouseup', pinMouseUpHandler);
      };

      document.addEventListener('mousemove', pinMouseMoveHandler);
      document.addEventListener('mouseup', pinMouseUpHandler);
    });
  };

  renderPins(window.getAdverts(8));
  createPinMainDrag();
})();
