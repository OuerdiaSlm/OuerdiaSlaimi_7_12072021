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
    if (target.length >= 3) {
      startSearch(target);
    }
  });
}

//
function displayRecipesWithTags(allRecipes, tabFiltre) {
  console.log("Tabfiltre 3 : " + tabFiltre);
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
      console.log("test" + tabFiltre);
    }
    let allRecipeReplace = [];
    // console.log("counteurOk:"+counteurOk+"tabFiltre:"+tabFiltre.length);
    if (counteurOk === tabFiltre.length) {
      allRecipes[k].html();
      allRecipeReplace.push(allRecipes[k]);

      console.log(allRecipeReplace);
      console.log(allRecipes[k]);
      displayIngredients(allRecipeReplace);
      displayAppareilles(allRecipeReplace);
      displayUstensiles(allRecipeReplace);
    }
  }
  let filtre2 = document.getElementsByClassName("motsSuggerer");
  clickFiltre(filtre2);
}

function removeRecipesWithTags(event, tabFiltre) {
  let contentParent = event.target.parentNode.textContent;
  console.log(contentParent);
  //document.getElementById("carteRecipe").innerHTML = "";
  resetData();
  for (let p = 0; p < tabFiltre.length; p++) {
    if (contentParent.toLowerCase() === tabFiltre[p].toLowerCase()) {
      tabFiltre.splice(p, 1);
      console.log(tabFiltre);
      event.target.parentNode.innerHTML = "";
      displayRecipesWithTags(allRecipes, tabFiltre);
    }
  }
}

function displayIngredients(recipes) {
  let divIngredients = document.getElementById("divIngredients");
  let z = 0;
  let ingredientTri = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let k = 0; k < recipes[i].ingredients.length; k++) {
      let j = 0;
      for (; j < ingredientTri.length; j++) {
        if (recipes[i].ingredients[k].ingredient === ingredientTri[j]) {
          z = 1;
        }
      }
      if (z == 0) {
        ingredientTri.push(recipes[i].ingredients[k].ingredient);
        const motsSuggere = document.createElement("li");
        divIngredients.appendChild(motsSuggere);
        motsSuggere.setAttribute("class", "motsSuggerer");
        attribution(divIngredients, motsSuggere, ingredientTri[j]);
        motsSuggere.style.display = "none";
        sousRecherche1.addEventListener("mouseenter", function () {
          motsSuggere.style.display = "block";
        });
      }
    }
    z = 0;
  }
  //console.log(ingredientTri);
}

function displayAppareilles(recipes) {
  let divAppareil = document.getElementById("divAppareil");
  let x = 0;
  let appareilTri = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let h = 0; h < recipes[i].appliance.length; h++) {
      let k = 0;
      for (; k < appareilTri.length; k++) {
        if (recipes[i].appliance === appareilTri[k]) {
          x = 1;
        }
      }
      if (x == 0) {
        appareilTri.push(recipes[i].appliance);
        const motsSuggere = document.createElement("li");
        divAppareil.appendChild(motsSuggere);
        motsSuggere.setAttribute("class", "motsSuggerer");
        attribution(divAppareil, motsSuggere, appareilTri[k]);
        motsSuggere.style.display = "none";
        sousRecherche2.addEventListener("mouseenter", function () {
          motsSuggere.style.display = "block";
        });
      }
    }
    x = 0;
  }
}
function displayUstensiles(recipes) {
  let divUstensiles = document.getElementById("divUstensiles");
  let y = 0;
  let ustensilsTri = [];
  for (let i = 0; i < recipes.length; i++) {
    for (let k = 0; k < recipes[i].ustensils.length; k++) {
      let j = 0;
      for (; j < ustensilsTri.length; j++) {
        if (recipes[i].ustensils[k] === ustensilsTri[j]) {
          y = 1;
        }
      }
      if (y == 0) {
        ustensilsTri.push(recipes[i].ustensils[k]);
        const motsSuggere = document.createElement("li");
        divUstensiles.appendChild(motsSuggere);
        motsSuggere.setAttribute("class", "motsSuggerer");
        attribution(divUstensiles, motsSuggere, ustensilsTri[j]);
        motsSuggere.style.display = "none";
        sousRecherche3.addEventListener("mouseenter", function () {
          motsSuggere.style.display = "block";
        });
      }
    }
    y = 0;
  }
}

function resetData() {
  document.getElementById("carteRecipe").innerHTML = "";
  document.getElementById("divIngredients").innerHTML = "";
  document.getElementById("divAppareil").innerHTML = "";
  document.getElementById("divUstensiles").innerHTML = "";
  // Ajouter le restet des div appareils et ustensils
}
