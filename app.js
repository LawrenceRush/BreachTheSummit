

//Lawrence's Messing around with stuff

// Accessing Location iq Api
var locationIqKey = "785528bf443c15"
var searchStr = "Los Angelos".replace(' ', '+');
console.log()
var queryURL = "https://us1.locationiq.com/v1/search.php?key=" + locationIqKey + "&q=" + searchStr + "&format=json";


//var queryURL = https:

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    var lat = response[0].lat
    var lon = response[0].lon
    console.log("Latitude is " + lat);
    console.log("Longitute is " + lon);
    useHikingApi(lat,lon)
  

})

//Accessing High"


function useHikingApi(x,y){

var hikingProjectKey = "200607956-eec4e186d6b9ed72c720132ab61fceb2";

var lat = x.slice(0,-3)
var lon = y.slice(0,-3)

var queryURL = "https://www.hikingproject.com/data/get-trails?lat="+ lat +"&lon="+ lon +"&maxDistance=10&key=" + hikingProjectKey;
console.log(queryURL)

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);
  

})
}

// DILLON TEST MAP

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

//   