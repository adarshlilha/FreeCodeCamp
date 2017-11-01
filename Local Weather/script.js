if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		console.log(lat);
		console.log(lon);
		var url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
		console.log(url);
		getJSON(url);
	});
}
var getJSON = function(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200){
			showData(xmlhttp.response);
		}
	}
}

function showData(data){
	data = JSON.parse(data);

	var city = document.querySelector('h3');
	city.innerText = `You are at ${data['name']} , ${data.sys['country']}`;

	var day_type = document.getElementById('day_type');
	day_type.innerText = data.weather[0].description;

	var icon = document.querySelector('img');
	icon.setAttribute("src",data.weather[0]['icon']);

	var cen = document.getElementById('cen');
	cen.innerHTML = 'Current Temp. ' + data.main['temp'] + '&deg;<span>C</span>';

	var humidity = document.getElementById('humidity');
	humidity.innerText = 'Humidity '+ data.main['humidity'] + '%';

	cen.addEventListener('click',changeTemp);

    var fahrenheit = ((9*data.main['temp'])+160)/5;
    function changeTemp(){
        if (document.querySelector('#cen span').innerText === 'C'){
        	cen.innerHTML = 'Current Temp. ' + fahrenheit.toFixed(2) + '&deg;<span>F</span>';
l        }else{
			cen.innerHTML = 'Current Temp. ' + data.main['temp'] + '&deg;<span>C</span>';
        }
	}
}