

const apikey = `b8688b122a854018a2605622240807`
const baseUrl = `http://api.weatherapi.com/v1/forecast.json`
let searchLocation = document.querySelector("#search")

searchLocation.addEventListener("change" , function(){
    getwheather(searchLocation.value) 
})

searchLocation.addEventListener("keyup" , function(e){
    if(e.key == "Enter")
    getwheather(searchLocation.value) 
})


async function getwheather(country) {
    console.log(country)
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b8688b122a854018a2605622240807&q=${country}&days=6`)
        let finalresponse = await response.json()
        displayWeatherData(finalresponse)
        console.log(finalresponse)
    } catch (error) {
        console.log("hi")
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a valid location or check your internet",
        });
    }
}



function displayWeatherData(finalresponse) {
    let dataArray = finalresponse.forecast.forecastday
    console.log(dataArray)

    let weatherbox = ``
    for (i = 0; i < dataArray.length; i++) {
        const date = new Date(dataArray[i].date)
        console.log(dataArray)
        const weekday = date.toLocaleDateString("en-uk", { weekday: "short" })

        console.log(weekday)
        if (i == 0) {
            weatherbox += `
                <div class="today forecast">
                    <div class="forecast-header d-flex justify-content-between" id="today">
                        <div class="day">${weekday}</div>
                        <div class=" date">9July</div>
                    </div>
                        <div class="forecast-content text-start p-3" id="current">
                        <div class="location">${finalresponse.location.country}</div>
                        <div class="degree">
                            <div class="num">${dataArray[i].day.maxtemp_c}<sup>o</sup>C</div>
                            <div class="forecast-icon">
                                <img src="${dataArray[i].day.condition.icon}" alt="" width="90">
                            </div>
                        </div>
                        <div class="custom">Clear</div>
                        <div>
                            <span><i class="fa-solid fa-umbrella me-2"></i>${finalresponse.current.temp_c}%</span>
                            <span><i class="fa-solid fa-wind me-2"></i>${finalresponse.current.wind_kph}km/h</span>
                            <span><i class="fa-solid fa-compass me-2"></i>${finalresponse.current.wind_dir}</span>
                        </div>
                    </div>
                </div>
            `
        }
        else if (i == 1 || i == 4) {
            weatherbox += `
            <div class="forecast mb-5" style="background-color: #262936;">
                    <div class="forecast-header">
                        <div class="day" style="background-color: #222530;">${weekday}</div>
                    </div>
                    <div class="forecast-content">
                        <div class="forecast-icon">
                            <img src="${dataArray[i].day.condition.icon}" alt="sun">
                        </div>
                        <div class="degree">${dataArray[i].day.maxtemp_c}<sup>o</sup>C</div>
                        <small>${dataArray[i].day.mintemp_c}<sup>o</sup></small>
                        <div class="custom">${dataArray[i].day.condition.text}</div>
                    </div>
                </div>
        `
        }
        else {
            weatherbox += `
            <div class="forecast">
                    <div class="forecast-header">
                        <div class="day">Thursday</div>
                    </div>
                    <div class="forecast-content">
                        <div class="forecast-icon">
                            <img src="https://cdn.weatherapi.com/weather/64x64/day/113.png" alt="sun">
                        </div>
                        <div class="degree">42.9<sup>o</sup>C</div>
                        <small>30<sup>o</sup></small>
                        <div class="custom">Sunny</div>
                    </div>
                </div>
        `
        }
    }
    document.querySelector(".forecast-container").innerHTML = weatherbox;
}

function myCurrentLocation(position){
    console.log("hi")
    let latitude = position.coords.latitude
    let longtude = position.coords.longitude
    let myCurrentPosition = `${latitude},${longtude}`
    console.log(myCurrentPosition)
    getwheather(myCurrentPosition)
}

navigator.geolocation.getCurrentPosition(myCurrentLocation)