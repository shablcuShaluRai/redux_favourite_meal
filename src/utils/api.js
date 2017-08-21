// const API_ID = process.env.REACT_APP_API_ID
// const APP_KEY = process.env.REACT_APP_APP_KEY

const API_ID ='77a30919'
const APP_KEY= '0ce6c1a44d06184f1523fd9f5ec794b5'

export function fetchRecipes (food = '') {
  food = food.trim()

  return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
