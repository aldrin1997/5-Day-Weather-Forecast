let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let forecastContainer = document.getElementById("forecast-container");
let cityName = document.getElementById("city-name");
let forecastTable = document.getElementById("forecast-table");

let apiKey = "b13be9218225449384574bf32ec31e83";
let baseUrl = "https://api.openweathermap.org/data/2.5/";

function search() {

  let city = cityInput.value;

  if (city) {

    let url = baseUrl + "forecast?q=" + city + "&appid=" + apiKey + "&units=metric";
    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(function(data) {
        forecastContainer.style.display = "block";
        cityName.textContent = data.city.name;
        let daily = data.list.filter(function(item) {
          return item.dt_txt.includes("12:00:00");
        });
        forecastTable.innerHTML = "";
        for (let i = 0; i < daily.length; i++) {
          let row = document.createElement("tr");
          let dateCell = document.createElement("td");
          let weatherCell = document.createElement("td");
          let tempCell = document.createElement("td");
          let humidityCell = document.createElement("td");
          let windCell = document.createElement("td");
         let descCell = document.createElement("td");
          dateCell.textContent = new Date(daily[i].dt * 1000).toLocaleDateString();
          weatherCell.innerHTML = "<img src='http://openweathermap.org/img/w/" + daily[i].weather[0].icon + ".png'>";
          tempCell.textContent = daily[i].main.temp + " °C";
          humidityCell.textContent = daily[i].main.humidity + "%";
          windCell.textContent = daily[i].wind.speed + " m/s";
          descCell.textContent = daily[i].weather[0].description;
          row.appendChild(dateCell);
          row.appendChild(weatherCell);
          row.appendChild(tempCell);
          row.appendChild(humidityCell);
          row.appendChild(windCell);
          row.appendChild(descCell);
          forecastTable.appendChild(row);
        }
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }
}

searchButton.addEventListener("click", search);