var coordinates = {};
var restaurant = JSON.parse(localStorage.getItem("restaurantCoords"));

var restaurantCoords = {
  lat: parseFloat(restaurant.lat),
  lng: parseFloat(restaurant.lng)
};
//used paseFloat() to keep the decimal points 

function initMap() {

  var location = restaurantCoords;
  //pull this from local storage for restaurant location
  var map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 17,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map
  })
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  coordinates = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }

  getMap();

}

function getMap() {

  var mapOptions = {
    zoom: 15,
    center: coordinates
    // 'coordinates should be entered as object '{lat: 44.978200, lng: -93.274120}' or 'new google.maps.LatLng(44.978200, -93.274120)'
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  calcRoute();
}


function calcRoute() {
  $('.col-3').addClass('directions');
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();

  var request = {
    origin: coordinates,
    destination: restaurantCoords,
    //change hard code to coordinates from local storage from zomato API
    travelMode: 'DRIVING'
  };

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("right-panel"));
  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}





$('#get-location').on('click', getLocation);
