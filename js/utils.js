'use strict';

window.utils = (function () {
  var ESC = 27;
  var ENTER = 13;

  var isEscPressed = function (evt) {
    return evt.keyCode === ESC;
  };

  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArrItem = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  return {
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    getRandomNumber: getRandomNumber,
    getRandomArrItem: getRandomArrItem
  };
})();
