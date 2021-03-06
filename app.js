//Lawrence's stuff

var gmarkers = [];

//Submit Button
$("#submit").click(testAPI)

// Accessing Location iq Api
var latitude = 33.6461
var longitute = -117.8425

//Side bar suff

function fillUpSideBar(response) {
    var sideBar = $("#side-bar");
    sideBar.empty();
    sideBar.append("<button id = 'x'> X </button>")
    sideBar.append("<h6> Trail Listing </<h6>")
    for (var i = 0; i < response.trails.length; i++) {
        var sideBarChild = $("<div id = 'sidebar-div'>" + (parseInt(i) + 1) + "." + " Name: " + response.trails[i].name + "<br>" + "Length: " + response.trails[i].length + " mi " + "<br>" + "Difficulty: " + response.trails[i].difficulty + "<br>" + "Summary: " + response.trails[i].summary + "<br>" + "<hr style=border: 4px solid black; />" + "</div>");
        sideBarChild.css('display', 'none');
        sideBar.append(sideBarChild);
        sideBarChild.show('slow');
    }

}



//Function that initiates geocoding
function testAPI() {
    removeMarkers();
    setAnimations1();
    var userSearch = $("#user-search").val();
    var locationIqKey = "785528bf443c15"
    var searchStr = userSearch.replace(' ', '+');
    var queryURL = "https://us1.locationiq.com/v1/search.php?key=" + locationIqKey + "&q=" + searchStr + "&format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //Assign lats to use with hiking api. Latitudes for google maps api
        var lat = response[0].lat
        latitude = parseFloat(lat)
        var lon = response[0].lon
        longitute = parseFloat(lon)
        useHikingApi(lat, lon)
    })
}
//Accessing HikingProject API


function useHikingApi(x, y) {

    var hikingProjectKey = "200607956-eec4e186d6b9ed72c720132ab61fceb2";

    var lat = x.slice(0, -3)
    var lon = y.slice(0, -3)
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=" + hikingProjectKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        fillUpSideBar(response)
        var hideButton = $("#x")
        hideButton.click(function () {
            setAnimations2();
        })
        var center = new google.maps.LatLng(latitude, longitute);
        map.setZoom(11);
        map.panTo(center);
        marker = new google.maps.Marker({
            position: center,
            map: map
        });
        gmarkers.push(marker)
        //Google maps navigation and markers

        for (var i = 0; i < response.trails.length; i++) {
            var tLocaton = new google.maps.LatLng(parseFloat(response.trails[i].latitude), parseFloat(response.trails[i].longitude));
            var tMarker = new google.maps.Marker({
                position: tLocaton,
                map: map,
                icon: "photos/hikingDude.png"
            });
            gmarkers.push(tMarker);
            //Function for multiple marker info boxes
            (function (tMarker, i) {

                google.maps.event.addListener(tMarker, 'mouseover', function () {
                    infowindow = new google.maps.InfoWindow({
                        content: "<div class=zIndexUp>" + response.trails[i].name + "</div>" + "<br>" +
                            "<div>" + "Length: " + response.trails[i].length + " miles &nbsp" + " Stars: " + response.trails[i].stars + "</div>" + "<br>" +
                            "<img src = " + response.trails[i].imgSmall + ">"
                    });
                    infowindow.open(map, tMarker);

                    google.maps.event.addListener(tMarker, 'mouseout', function () {

                        infowindow.close(map, tMarker);
                    });

                });
            })(tMarker, i);


        }
        console.log(gmarkers);



    })
}

//function to hide side bar stuff
var hideButton = $("#x")
hideButton.click(function () {
    console.log("cat")
    $("#side-bar").addClass("hidden");

})

function setAnimations1() {
    $("#side-bar").removeClass("hidden");
    $("#side-bar").addClass("visible");
    $(".z-depth-4").addClass("slide-out");
    $(".z-depth-4").removeClass("slide-in");
}

function setAnimations2() {
    $("#side-bar").removeClass("visible");
    $("#side-bar").addClass("hidden");
    $(".z-depth-4").removeClass("slide-out");
    $(".z-depth-4").addClass("slide-in");
}

function removeMarkers(map){
    for(var i=0; i<gmarkers.length; i++){
        gmarkers[i].setMap(null);
    }
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
    gmarkers.push(marker)
    map.setZoom(11);

}

// IP ADDRESS

function ipLookUp() {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                console.log('User\'s Location Data is ', response);
                console.log('User\'s Country', response.country);

            },
            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}

ipLookUp()

$(document).keypress(function(e){
    if (e.which == 13){
        testAPI();
    }
});






