const apiKey = "c28b93e2037bb1d9137008dc334853ba";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".weather-icon");
const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function getWeather(city) {
	const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
	const data = await response.json();
	console.log(data);

	cityName.innerHTML = data.name;
	temp.innerHTML = Math.round(data.main.temp) + " °C";
	humidity.innerHTML = data.main.humidity + "%";
	wind.innerHTML = data.wind.speed + " km/h";

	icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

getWeather("Yogyakarta");

searchBtn.addEventListener("click", function (event) {
	event.preventDefault();
	getWeather(search.value);
});
