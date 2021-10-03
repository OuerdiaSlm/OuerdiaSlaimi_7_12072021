let appareilTri = [];
let ingredientTri = [];
let ustensilsTri = [];

let displayedRecipes=[];

//appareilTri.push(recipes[0].appliance);
let allRecipes=[];

for (let i = 0; i < recipes.length; i++) {
  // Nouvelle class
  let carte = new Recette(
    recipes[i].name,
    recipes[i].ingredients,
    recipes[i].time,
    recipes[i].description,
    recipes[i].appliance,
    recipes[i].ustensils,
  );
  allRecipes.push(carte);
  displayedRecipes.push(carte);
  carte.html();

  
}




