const api = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const input = document.getElementById('search-box')
const cardContainer = document.getElementById('card')
const nodish = document.querySelector('.no-dish');

input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const ingredient = event.target.value.trim()
    if (ingredient) {
      const apiUrl = api + ingredient
      getApi(apiUrl)
    }
  }
})

async function getApi (apikey) {
  try {
    const response = await fetch(apikey);
   const data =  await response.json();
    showData(data)
  } catch (error) {
    console.log(' error - > ', error);
    
    nodish.style.display = "block";
  }
}

function showData(data){
    const allMeals = data.meals;
  const card = cardContainer;
  
  // Clear previous results
  card.innerHTML = '';

    if (!allMeals) {
    nodish.style.display = "block"; // Show message if no meals
    return;
  }

  nodish.style.display = "none"; // Hide message when meals exist


  allMeals.forEach(element => {
    card.appendChild(createCard(element));
  });
    
}

function createCard(element){
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card");

    // Thumbnail image
  const thumbImage = document.createElement('img');
  thumbImage.src = element.strMealThumb;
  thumbImage.alt = element.strMeal;
  thumbImage.classList.add('thumbnail-img');

// Info section
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-div');

  const name = document.createElement('p');
  name.classList.add('dish-name');
  name.innerText = `Name: ${element.strMeal}`;

  infoDiv.appendChild(name);
  cardDiv.appendChild(thumbImage);
  cardDiv.appendChild(infoDiv);

  return cardDiv;

}