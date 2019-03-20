let button = document.getElementById('weatherBtn');


button.onclick = function () {

    document.getElementById('weatherContainer').style.display = 'block';

    let geoSuccess = function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let myAPI_Key = "8d6699bb26704cbae02cd7a9715ca421";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myAPI_Key}`;
        ajax_get(url);
    };
    let geoError = function (error) {
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};


// retrieving data using ajax
function ajax_get(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
                createWeatherData(data);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// add data to the table
function createWeatherData(data) {
    document.getElementById('location').innerHTML = `Your current location : ${data.name}` ;
    document.getElementById('lat').innerHTML = data.coord.lat ;
    document.getElementById('long').innerHTML = data.coord.lon ;
    document.getElementById('temp').innerHTML = `${toFahrenheit(data.main.temp)} &#8457; ( ${toCelsius(data.main.temp)} &#8451; )`;
    document.getElementById('visibility').innerHTML =  data.weather[0].main;
    document.getElementById('sunrise').innerHTML = toLocalTime(data.sys.sunrise);
    document.getElementById('sunset').innerHTML = toLocalTime(data.sys.sunset);
    document.getElementById('date').innerHTML = toLocalDate(new Date());
}

//to convert from Kelvin to Fahrenheit
function toFahrenheit(temp){
    let currentTemp = ( ((temp - 273.15)*1.8) + 32 );
    return currentTemp.toFixed(2);
}

//to convert from Kelvin to Celsius
function toCelsius(temp){
    let currentTemp = (temp - 273.15);
    
    return currentTemp.toFixed(2);
}

// to convert into lcoal time
function toLocalTime(date){
    let localTime = new Date(date).toString().split(" ")[4];
    return localTime;
}

// to convert into local date
function toLocalDate(date){
    let today = date;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
}

// to hide weatheContainer
window.onload = function () {
    document.getElementById('weatherContainer').style.display = 'none';
}