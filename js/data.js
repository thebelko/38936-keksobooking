'use strict';

window.getAdverts = (function () {
  var ADVERT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_TYPE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getRandomFeatures = function () {
    var randomFeatures = [];
    var randomNumber = window.utils.getRandomNumber(1, 7);
    var featuresTypeCopy = FEATURES_TYPE.slice();

    for (var i = 0; i < randomNumber; i++) {
      var feature = window.utils.getRandomArrItem(featuresTypeCopy);
      randomFeatures.push(feature);
      featuresTypeCopy.splice(featuresTypeCopy.indexOf(feature), 1);
    }

    return randomFeatures;
  };

  var getRandomLocation = function () {
    return {
      x: window.utils.getRandomNumber(300, 901),
      y: window.utils.getRandomNumber(300, 501)
    };
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
    advert.offer.price = window.utils.getRandomNumber(1000, 1000001);
    advert.offer.type = window.utils.getRandomArrItem(HOUSE_TYPE);
    advert.offer.rooms = window.utils.getRandomNumber(1, 6);
    advert.offer.guests = window.utils.getRandomNumber(1, 9);
    advert.offer.checkin = window.utils.getRandomArrItem(CHECK_TIMES);
    advert.offer.checkout = window.utils.getRandomArrItem(CHECK_TIMES);
    advert.offer.description = '';
    advert.offer.photos = [];
    advert.offer.features = getRandomFeatures();
    advert.offer.address = advert.location.x + ', ' + advert.location.y;

    return advert;
  };

  return function (advertsQuantity) {
    var adverts = [];

    for (var i = 0; i < advertsQuantity; i++) {
      adverts.push(getAdvert(i));
    }

    return adverts;
  };
})();
