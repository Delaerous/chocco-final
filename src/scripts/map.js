let myMap;
const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.938143, 30.344302],
    zoom: 11,
    controls: [],
  });

  let coords = [
      [59.938143, 30.344302],
      [59.920222, 30.32199],
      [59.942055, 30.381885],
    ],
    myCollection = new ymaps.GeoObjectCollection(
      {},
      {
        draggable: false,
        iconLayout: "default#image",
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52],
      }
    );

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable("scrollZoom");
};

ymaps.ready(init);
