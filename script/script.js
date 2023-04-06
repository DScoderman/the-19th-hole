var map;
var service;
var infowindow;
// var APIKeyGoogle = "AIzaSyCfEbgTYj5gyLq7womR6gc4xBQxDa3moZE";
var APIKeyWeather = "383165bf31a4af053f333f929519989c";


// TODO: Event listener for submit button
$("#formSubmit").on("submit", function (e) {
    e.preventDefault();

    var zipCode = $("#zip").val();
    getCoord(zipCode);
    console.log(zipCode);
})



// TODO: Get lat/lon from zipcode
function getCoord(zipCode) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&limit=5&appid=${APIKeyWeather}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat, lon);
            // currentWeather(lat, lon);
            // forecastWeather(lat,lon);

            initMap(lat, lon);

        })
}




//  map information
function initMap(lat, lon) {
    var location = new google.maps.LatLng(lat, lon);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 8
    });

    var request = {
        location: location,
        // input field for radius
        radius: '50',
        query: "golf course"
    };

    var request2 = {
        location: location,
        radius: '50',
        query: "brewery"
    };

    var service = new google.maps.places.PlacesService(map);

    // Array for Golf Courses
    service.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results)

            document.getElementById("golfcards").innerHTML = "";

            // TODO: ADD FOR LOOP
            for (var i = 0; i < results.length - 15; i++) {
                console.log(results[i]);

                var golfName = document.createElement("h2")
                golfName.textContent = results[i].name;
                var golfAddress = document.createElement("h2")
                golfAddress.textContent = results[i].formatted_address;
                // var golfImgURL = document.createElement("h2")
                // golfImgURL.textContent = results[i].icon;
                var golfcards = document.createElement("div");
                golfcards.setAttribute("class", "golfcards");
                golfcards.append(golfName, golfAddress);

                document.getElementById("golfcards").append(golfcards);
            }

        }
    });

    // Array for breweries
    service.textSearch(request2, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results)
            // TODO: ADD FOR LOOP - max 5

            document.getElementById("distributorsCards").innerHTML = "";

            for (var i = 0; i < results.length - 15; i++) {
                console.log(results[i]);

                var distName = document.createElement("h2")
                distName.textContent = results[i].name;
                var distAddress = document.createElement("h2")
                distAddress.textContent = results[i].formatted_address;
                // var golfImgURL = document.createElement("h2")
                // golfImgURL.textContent = results[i].icon;
                var distcards = document.createElement("div");
                distcards.setAttribute("class", "distributorsCards");
                distcards.append(distName, distAddress);

                document.getElementById("distributorsCards").append(distcards);
            }


        }

    })
}

// -----------------DREWS UPDATES----------------------------//
// adding variables to get the search. Save var needs to be updated


// todo: update save var, add classes in to code once Bulma CSS is done
const zipCode = document.querySelector('#zip')
var submitForm = document.querySelector('#formSubmit')
console.log(zipCode, submitForm);



// gets the data from the API based off zip code
submitForm.addEventListener('submit', function (event) {
    event.preventDefault()
    var inputvalue = zipCode.value;
    console.log(inputvalue);
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + inputvalue + '?key=BC56DV38KGW5TK327XDYHBPXD')
        .then(function (response) {

            return response.json()
        }).then(function (data) {
            console.log(data)
        })
})

console.log(inputvalue)
