const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const apiKey = `&appid=cab045dab0d75a23796e0a7732e5483e&units=metric`

const weatherIcon = document.getElementById('wi')
const weatherP = document.getElementById('weather-p')
const popUp = document.querySelector('.toast')
//getting info from the input

const searchBar = document.getElementById('search-bar')
searchBar.addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    const city = event.target.value
    if (city === undefined || city === null || city == '') {
      popUp.style.display = 'block'
      setTimeout(() => {
        popUp.style.display = 'none'
      }, 3500)
    }
    checkWeather(city)
  }
})

async function checkWeather (city) {
  try {
    const rseponse = await fetch(apiURL + city + apiKey)
    const data = await rseponse.json()
    document.getElementById('city').innerText = data.name
    document.getElementById('temp').innerHTML = `${Math.round(
      data.main.temp
    )}°C`
    document.getElementById('humidity-id').innerHTML = data.main.humidity + '%'
    document.getElementById('wind-val').innerHTML = `${data.wind.speed} km/h`

    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = './assets/cloud-50.png'
      weatherP.innerHTML = 'Clouds'
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = './assets/sun.png'
      weatherP.innerHTML = 'Clear'
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = './assets/rain.png'
      weatherP.innerHTML = 'Rain'
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = './assets/heavy-rain-50.png'
      weatherP.innerHTML = 'Drizzle'
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = './assets/mist.png'
      weatherP.innerHTML = 'Mist'
    }

    document.querySelector('.weather').style.display = 'block'
  } catch (error) {
    // console.log('error--> ', error)
    popUp.style.display = 'block'
      setTimeout(() => {
        popUp.style.display = 'none'
      }, 3500)
    
  }
}
