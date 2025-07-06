const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const apiKey = `&appid=cab045dab0d75a23796e0a7732e5483e&units=metric`
//getting info from the input

const searchBar = document.getElementById('search-bar')
 searchBar.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        const city = event.target.value;  
        checkWeather(city)    
    }
})




async function checkWeather (city) {
  try {
    const rseponse = await fetch(apiURL+city+apiKey)
    const data = await rseponse.json()
    document.getElementById('city').innerText = data.name
    document.getElementById('temp').innerHTML = `${Math.round(
      data.main.temp
    )}°C`
    document.getElementById('humidity-id').innerHTML = data.main.humidity + '%'
    document.getElementById('wind-val').innerHTML = `${data.wind.speed} km/h`
  } catch (error) {
    console.log('error--> ', error)
  }
}


