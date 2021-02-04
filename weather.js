let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//City Name
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = ``;
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2e620dbba8b6f5fac83c1c2ca65762c1`,

            {
                mode: 'cors'
            }
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const {
            name
        } = weatherData;
        const {
            feels_like
        } = weatherData.main;
        const {
            id,
            main
        } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);
        if (id < 300 && id > 200) {
            tempIcon.src = "./icons/thunderstorm.svg"
        } else if (id < 400 && id > 300) {
            tempIcon.src = "./icons/cloud-solid.svg"
        } else if (id < 600 && id > 500) {
            tempIcon.src = "./icons/rain.svg"
        } else if (id < 700 && id > 600) {
            tempIcon.src = "./icons/snow.svg"
        } else if (id < 800 && id > 700) {
            tempIcon.src = "./icons/clouds.svg"
        } else if (id == 800) {
            tempIcon.src = "./icons/clouds-and-sun.svg"
        }

    }
    catch(error){
       
    }
};




window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                const proxy = "https://cors-anywhere.herokuapp.com/";
                const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2e620dbba8b6f5fac83c1c2ca65762c1`

                fetch(api).then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        const {
                            name
                        } = data;
                        const {
                            feels_like
                        } = data.main;
                        const {
                            id,
                            main
                        } = data.weather[0];

                        loc.textContent = name;
                        climate.textContent = main;
                        tempValue.textContent = Math.round(feels_like - 273);

                        if (id < 300 && id > 200) {
                            tempIcon.src = "./icons/thunderstorm.svg"
                        } else if (id < 400 && id > 300) {
                            tempIcon.src = "./icons/cloud-solid.svg"
                        } else if (id < 600 && id > 500) {
                            tempIcon.src = "./icons/rain.svg"
                        } else if (id < 700 && id > 600) {
                            tempIcon.src = "./icons/snow.svg"
                        } else if (id < 800 && id > 700) {
                            tempIcon.src = "./icons/clouds.svg"
                        } else if (id == 800) {
                            tempIcon.src = "./icons/clouds-and-sun.svg"
                        }
                        console.log(data);
                    })
            }

        )
    }
})