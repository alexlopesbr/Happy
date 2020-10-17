// create map
const map = L.map('mapid').setView([-22.4128093, -42.9711956], 15);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

//create and add marker
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// photos upload
function addPhotoField() {
  //get picture container #images
  const container = document.querySelector('#images');

  //duplicate .new-image container
  const fieldsContainer = document.querySelectorAll('.new-upload');

  //clone the last image added
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  //check if the field is empty, if yes, do not add it to the image container
  const input = newFieldContainer.children[0];

  if (input.value == '') {
    return;
  }

  //clean container before adding to the image container
  input.value = '';

  //add the clone to the #images container
  container.appendChild(newFieldContainer);
}

function deletField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll('.new-upload');

  if (fieldsContainer.length < 2) {
    //clear the field value
    span.parentNode.children[0].value = '';

    return;
  }

  // delete field
  span.parentNode.remove();
}

function toggleSelect(event) {
  //remove the .active class from the buttons
  document
    .querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'));

  // put the .active class
  const button = event.currentTarget;
  button.classList.add('active');

  // update my hidden input with the selected value
  const input = document.querySelector('[name="opening_on_weekends"]');

  input.value = button.dataset.value;
}

// form position validade / Challenge

function validate(event) {
  lat = document.querySelector('[name=lat]').value;
  lng = document.querySelector('[name=lng]').value;

  if (lat == '' && lng == '') {
    event.preventDefault();
    alert('Por favor, não esqueça a localização no mapa');
  }
}
