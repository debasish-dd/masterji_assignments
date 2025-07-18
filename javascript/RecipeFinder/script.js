const api = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const input = document.getElementById('search-box')
const cardContainer = document.getElementById('card')


input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const ingredient = event.target.value.trim()
    if (ingredient) {
      const apiUrl = api + ingredient
      getApi(apiUrl)
    }
  }
})

async function getApi(apikey) {
  try {

    const response = await fetch(apikey)
    const data = await response.json()
  
    showData(data )
      console.log(data);

      
  } catch (error) {
    const nodishP = document.createElement('p');
    nodishP.classList.add('no-dish');
    cardContainer.appendChild(nodishP)
    console.error(' error while fetching api- > ', error) 
  }
}

function showData(data ) {
  const allMeals = data.meals
  
  
  const card = cardContainer

  // Clear previous results
  card.innerHTML = ''

  allMeals.forEach(element => {

    card.appendChild(createCard(element))
    const dishID = element.idMeal
  // console.log("dish id is: -" , dishID); //got the dish id here

  })
}

function createCard(element) {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')

  // Thumbnail image
  const thumbImage = document.createElement('img')
  thumbImage.src = element.strMealThumb
  thumbImage.alt = element.strMeal
  thumbImage.classList.add('thumbnail-img')

  // Info section
  const infoDiv = document.createElement('div')
  infoDiv.classList.add('info-div')

  const name = document.createElement('p')
  name.classList.add('dish-name')
  name.innerText = `Name: ${element.strMeal}`

  infoDiv.appendChild(name)
  cardDiv.appendChild(thumbImage)
  cardDiv.appendChild(infoDiv)

  cardDiv.addEventListener("click" , ()=>{
    const dishId = element.idMeal;
    // console.log(dishid);
    callDishById(dishId)
    
  })
  return cardDiv
}

async function callDishById(id) {
  const dishAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

  try {

  const response = await fetch(dishAPI);
  const data = await response.json();

  const dishInstructions = data.meals[0].strInstructions

  console.log("dish is -->" , dishInstructions );
    addPopUpInstructions(dishInstructions)

  } catch (error) {
    console.error("error while fetching the instructions -->" , error);
      
  }

}

function addPopUpInstructions(instructions){
    console.log(instructions);
    
  const instP = document.createElement('p');
  instP.innerText = instructions;

  const marginDiv = document.createElement('div');
  marginDiv.classList.add("margin");
  

  const popUpDiv = document.querySelector(".page");
  popUpDiv.innerHTML = "";
  popUpDiv.appendChild(marginDiv);
  popUpDiv.appendChild(instP);

  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = "flex"

  lightbox.addEventListener("click" , (event)=>{
    if (event.target !== popUpDiv && event.target===lightbox ) {
      lightbox.style.display = "none"
      console.log("success" , event.currentTarget);
    }
    
    
  })

}