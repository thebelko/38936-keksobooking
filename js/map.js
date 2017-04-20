'use strict';

window.pins = (function () {
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

        console.log('startCoords x:' + startCoords.x + 'y:' + startCoords.y);
        console.log('moveClientX: ' + moveEvt.clientX + 'moveClientY: ' + moveEvt.clientY);

        console.dir(document.querySelector('.tokyo'));

        if (moveEvt.pageX < 1200 && moveEvt.pageY < 660) {
          pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
          pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

          addressInput.value = 'x:' + pinMain.style.left + ', y:' + pinMain.style.top;
        } else {
          pinMain.style.top = startCoords.y;
          pinMain.style.left = startCoords.x;
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

  return {
    render: renderPins,
    mainPinDrag: createPinMainDrag
  };
})();

window.pins.render(window.getAdverts(8));
window.pins.mainPinDrag();
