

//Lawrence's Messing around with stuff

// Accessing Location iq Api
var locationIqKey = "785528bf443c15"
var searchStr = "Los Angelos".replace(' ', '+');
console.log()
var queryURL = "https://us1.locationiq.com/v1/search.php?key=" + locationIqKey + "&q=" + searchStr + "&format=json";
var latitude = -25.344;
var longitute = 131.036;



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    var lat = response[0].lat
    latitude = parse.Float(lat)
    var lon = response[0].lon
    longitute = parse.Float(lon)
    console.log("Latitude is " + lat);
    console.log("Longitute is " + lon);
    useHikingApi(lat, lon)


})

//Accessing HikingProject API"


function useHikingApi(x, y) {

    var hikingProjectKey = "200607956-eec4e186d6b9ed72c720132ab61fceb2";

    var lat = x.slice(0, -3)
    var lon = y.slice(0, -3)

    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=" + hikingProjectKey;
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);


    })
}

 
   


// DILLON'S MOCK MAP
// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}








  
