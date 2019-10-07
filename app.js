//Lawrence's stuff


//Submit Button
$( "#submit" ).click(testAPI)

// Accessing Location iq Api
var latitude = -25.344;
var longitute = 131.036;

//Side bar suff
 
function fillUpSideBar(response){
    var sideBar = $("#side-bar");
    for(var i = 0; i < response.trails.length; i++){
    var sideBarChild = $("<div id = 'sidebar-div'>" + response.trails[i].name + "</div>");
    sideBarChild.css('display','none');
    sideBar.append(sideBarChild);
    sideBarChild.show('slow');
    }

}

$(function() {

    var $sidebar   = $("#sidebar"), 
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
    
});

//Function that initiates geocoding
function testAPI(){
    $("#side-bar").addClass("visible");
    
  var userSearch = $("#user-search").val();
  console.log(userSearch);
  var locationIqKey = "785528bf443c15"
  var searchStr = userSearch.replace(' ', '+');
  var queryURL = "https://us1.locationiq.com/v1/search.php?key=" + locationIqKey + "&q=" + searchStr + "&format=json";
  $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
//Assign lats to use with hiking api. Latitudes for google maps api
    var lat = response[0].lat
    latitude = lat
    var lon = response[0].lon
    longitute = lon
    console.log("Latitude is " + lat);
    console.log(latitude)
    console.log("Longitute is " + lon);
    useHikingApi(lat, lon)
    console.log(longitute);


})

  latitude = parseFloat(latitude);
  longitute = parseFloat(longitute);
}
//Accessing HikingProject API


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

        fillUpSideBar(response)
        console.log(response);
        var center = new google.maps.LatLng(latitude,longitute);
        
        map.setZoom(11);
        map.panTo(center);
        
        marker = new google.maps.Marker({
            position: center,
            map: map
        });
        console.log(response.trails.length)
        
        //Google maps navigation and markers
        
        for (var i = 0; i < response.trails.length; i++){
            console.log(parseFloat(response.trails[i].latitude), parseFloat(response.trails[i].longitude));
            var tLocaton = new google.maps.LatLng(parseFloat(response.trails[i].latitude),parseFloat(response.trails[i].longitude));
            var tMarker = new google.maps.Marker({
                position: tLocaton,
                map: map,
                icon: "photos/hikingDude.png"
            });
            //Function for multiple marker info boxes
            (function(tMarker, i) {
            
                google.maps.event.addListener(tMarker, 'mouseover', function() {
                    infowindow = new google.maps.InfoWindow({
                        content: "<div>" + response.trails[i].name + "</div>" + "<br>" +
                        "<div>" + "Length: " + response.trails[i].length + " miles &nbsp"+ " Stars: " + response.trails[i].stars + "</div>" + "<br>" +
                        "<img src = "+ response.trails[i].imgSmall +  ">"
                    });
                    infowindow.open(map, tMarker);
                 
                    google.maps.event.addListener(tMarker, 'mouseout', function() {
                   
                        infowindow.close(map, tMarker);
                    });

                });
            })(tMarker, i);
        
            
        }
         

        
    })
}




   
var map

// DILLON'S MOCK MAP
// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = { lat: latitude, lng: longitute };
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
    
}









  
