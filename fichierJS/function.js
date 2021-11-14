function attribution(parent, enfant, data) {
  parent.appendChild(enfant);
  enfant.textContent = data;
}

function addText(enfant, data) {
  enfant.textContent = enfant.textContent + data;
}

//function input mots
function searchCode(siteSearch) {
  siteSearch.addEventListener("input", (e) => {
    let target = e.target.value;
    if (target.length >= 0) {
      startSearch(target);
    }
  });
}

//function input mots Ingredient Appareil Ustensiles
function searchCodeTest(siteSearchIngAppUst) {
  siteSearchIngAppUst.addEventListener("input", (e) => {
    let target = e.target.value;
      startSearchTest(target);
  });
}

//
function displayRecipesWithTags(allRecipes, tabFiltre) {
  let allRecipeReplace = [];
  for (let k = 0; k < allRecipes.length; k++) {
    let counteurOk = 0;
    for (let j = 0; j < tabFiltre.length; j++) {
      //Evenement click ingredients
      for (let l = 0; l < allRecipes[k].ingredients.length; l++) {
        if (
          allRecipes[k].ingredients[l].ingredient
            .toLowerCase()
            .search(tabFiltre[j].toLowerCase()) != -1
        ) {
          counteurOk++;
          //spanFilterSelectedClick.setAttribute("class", "ingredientFilterClick");
        }
      }
      //Evenement click appliance
      if (
        allRecipes[k].appliance
          .toLowerCase()
          .search(tabFiltre[j].toLowerCase()) != -1
      ) {
        counteurOk++;
        //spanFilterSelectedClick.setAttribute("class", "applianceFilterClick");
      }
      //Evenement click ustensiles
      for (let m = 0; m < allRecipes[k].ustensils.length; m++) {
        if (
          allRecipes[k].ustensils[m]
            .toLowerCase()
            .search(tabFiltre[j].toLowerCase()) != -1
        ) {
          counteurOk++;
          //spanFilterSelectedClick.setAttribute("class", "ustensilesFilterClick");
        }
      }
    }
    if (counteurOk === tabFiltre.length) {
      allRecipes[k].html();
      allRecipeReplace.push(allRecipes[k]);
    }
  }
  displayIngredients(allRecipeReplace);
  displayAppareilles(allRecipeReplace);
  displayUstensiles(allRecipeReplace);
  let filtre2 = document.getElementsByClassName("motsSuggerer");
  clickFiltre(filtre2);
}

function removeRecipesWithTags(event, tabFiltre) {
  let contentParent = event.target.parentNode.textContent;
  console.log(event+"Je suiis laaaa");
  resetData();
  for (let p = 0; p < tabFiltre.length; p++) {
    console.log(tabFiltre+"VAVVAAAMMMM")
    if (contentParent.toLowerCase() === tabFiltre[p].toLowerCase()) {
      tabFiltre.splice(p, 1);
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      displayRecipesWithTags(allRecipes, tabFiltre);
    }
  }
}

function displayIngredients(recipes) {
  let divIngredients = document.getElementById("divIngredients");
  let z = 0;
  ingredientTri = [];
  recipes.forEach(recipes=>{
    recipes.ingredients.forEach(ingredients=>{
      let j = 0;
      for (; j < ingredientTri.length; j++) {
        if (ingredients.ingredient === ingredientTri[j]) {
          z = 1;
        }
      }
      if (z == 0) {
        ingredientTri.push(ingredients.ingredient);
        const motsSuggere = document.createElement("li");
        divIngredients.appendChild(motsSuggere);
        motsSuggere.setAttribute("class", "motsSuggerer");
        motsSuggere.dataset.ingredient=ingredientTri[j];
        attribution(divIngredients, motsSuggere, ingredientTri[j]);
        motsSuggere.style.display = "none";
        sousRecherche1.addEventListener("mouseenter", function () {
          motsSuggere.style.display = "block";
        });
      }
    })
    z = 0;
  })
}

function displayAppareilles(recipes) {
  let divAppareil = document.getElementById("divAppareil");
  appareilTri = [];
  recipes.forEach((recipe) => {
    if (!appareilTri.includes(recipe.appliance)) {
      appareilTri.push(recipe.appliance);
      const motsSuggere = document.createElement("li");
      motsSuggere.setAttribute("class", "motsSuggerer");
      motsSuggere.dataset.appliance=recipe.appliance;
      attribution(divAppareil, motsSuggere, recipe.appliance);
      motsSuggere.style.display = "none";
      sousRecherche2.addEventListener("mouseenter", function () {
        motsSuggere.style.display = "block";
      });
    }
  });
}
function displayUstensiles(recipes) {
  let divUstensiles = document.getElementById("divUstensiles");
  let y = 0;
  ustensilsTri = [];
  recipes.forEach(recipes=>{
    recipes.ustensils.forEach(ustensils=>{
      let j = 0;
      for (; j < ustensilsTri.length; j++) {
        if (ustensils === ustensilsTri[j]) {
          y = 1;
        }
      }
      if (y == 0) {
        ustensilsTri.push(ustensils);
        const motsSuggere = document.createElement("li");
        divUstensiles.appendChild(motsSuggere);
        motsSuggere.setAttribute("class", "motsSuggerer");
        motsSuggere.dataset.ustensils=ustensilsTri[j];
        attribution(divUstensiles, motsSuggere, ustensilsTri[j]);
        motsSuggere.style.display = "none";
        sousRecherche3.addEventListener("mouseenter", function () {
          motsSuggere.style.display = "block";
        });
      }
    })
    y = 0;
  })
}

function resetData() {
  document.getElementById("carteRecipe").innerHTML = "";
  document.getElementById("divIngredients").innerHTML = "";
  document.getElementById("divAppareil").innerHTML = "";
  document.getElementById("divUstensiles").innerHTML = "";
  // Ajouter le restet des div appareils et ustensils
}