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
displayIngredients(displayedRecipes);
displayAppareilles(displayedRecipes);
displayUstensiles(displayedRecipes);

//-1 Recupération de la barre de recherche
let search = document.getElementById("siteSearch");
searchCode(search );

//Evenement sur la barre de recherche '3 caractere'
//Deuxieme Algo
let startSearch= (word) =>{
  resetData();
  displayedRecipes = [];
    allRecipes.forEach(element=>{
    // Evenement sur le titre
    if(element.name.toLowerCase().search(word.toLowerCase())!= -1){
      element.html();
      displayedRecipes.push(element)
    }
    //Evenement sur les ingredients
    for (let j=0; j < element.ingredients.length; j++){
      let ingredientsChemain = element.ingredients[j].ingredient;
      if(ingredientsChemain.toLowerCase().search(word.toLowerCase())!= -1){
        element.html();
        displayedRecipes.push(element)
      }
    }
    //Evenemnt sur les appareilles 
    if(element.appliance.toLowerCase().search(word.toLowerCase())!= -1){
      element.html();
      displayedRecipes.push(element)
    }
    //Evenemnt sur les ustensiles 
    for (let k=0; k < element.ustensils.length; k++){
      if(element.ustensils[k].toLowerCase().search(word.toLowerCase())!= -1){
        element.html();
        displayedRecipes.push(element)
      }
    }
  })
  displayIngredients(displayedRecipes);
  displayAppareilles(displayedRecipes);
  displayUstensiles(displayedRecipes);
}

//-2 Recuperation des filtres
let filtre = document.getElementsByClassName("motsSuggerer");

//-2 Evenement sur la barre de recherche de Ingredients, ustensiles ainsi que appareille
let searchIngredients = document.getElementById("siteSearchIngredients");
let searchAppareil = document.getElementById("siteSearchAppareil");
let searchUstensiles = document.getElementById("siteSearchUstensiles");
searchCodeTest(searchIngredients);
searchCodeTest(searchAppareil);
searchCodeTest(searchUstensiles);

let startSearchTest= (word) =>{
  //ingredient
  for (i=0; i<ingredientTri.length; i++){
    //Evenement sur les ingredients
      if(ingredientTri[i].toLowerCase().search(word.toLowerCase())== -1){
        document.querySelector('[data-ingredient="'+ingredientTri[i]+'"]').style.display="none";
      } else {
        document.querySelector('[data-ingredient="'+ingredientTri[i]+'"]').style.display="block";
      }
  }
  //appareille  
  for(h=0; h<appareilTri.length; h++){
    //Evenement sur les appareille
      if(appareilTri[h].toLowerCase().search(word.toLowerCase())== -1){
        document.querySelector('[data-appliance="'+appareilTri[h]+'"]').style.display="none";
      } else {
        document.querySelector('[data-appliance="'+appareilTri[h]+'"]').style.display="block";
      }
  }
  //ustensiles
  for (j=0; j<ustensilsTri.length; j++){
    //Evenement sur les appareille
      if(ustensilsTri[j].toLowerCase().search(word.toLowerCase())== -1){
        document.querySelector('[data-ustensils="'+ustensilsTri[j]+'"]').style.display="none";
      } else {
        document.querySelector('[data-ustensils="'+ustensilsTri[j]+'"]').style.display="block";
      }
  }
}
clickFiltre(filtre);
  let tabFiltre=[];
  // boucle filtre/evenement click...filtreClass=filtre
  function clickFiltre(filtreclass){
    for (i=0; i<filtreclass.length; i++){
      filtreclass[i].addEventListener("click", function(e){
        resetData();  
            let target=e.target.textContent;
            if(!tabFiltre.includes(target)){
              tabFiltre.push(target);
            } else{
              tabFiltre= tabFiltre.filter(word => word != target );
            }
            // Div qui va contenir les filtres sur le quel on a cliqué
            const divFilterSelected = document.getElementById("filterSelected");
            let spanFilterSelectedClick=document.createElement("span");
            divFilterSelected.appendChild(spanFilterSelectedClick);
            
            //(-1) psk c'est un tableau et l'index d'un tableau commence par 0
            spanFilterSelectedClick.textContent=tabFiltre[tabFiltre.length-1];
            let croix= document.createElement("i");
            croix.addEventListener("click", (e)=>{removeRecipesWithTags(e, tabFiltre)});
            spanFilterSelectedClick.appendChild(croix);
            croix.setAttribute("class", "far fa-times-circle", "croix");
            croix.setAttribute("id", "croix");    

            displayRecipesWithTags(allRecipes, tabFiltre);
            //TEST
            for (let b=0; b < allRecipes.length; b++){
              for (let c=0; c < allRecipes[b].ingredients.length; c++){
                if(spanFilterSelectedClick.textContent === allRecipes[b].ingredients[c].ingredient){
                  spanFilterSelectedClick.setAttribute("class", "filtreClckIngredients");
                }
              }
              if(spanFilterSelectedClick.textContent === allRecipes[b].appliance){
                spanFilterSelectedClick.setAttribute("class", "filtreClickAppliance");
              }
              for (let d=0; d < allRecipes[b].ustensils.length; d++){
                if(spanFilterSelectedClick.textContent === allRecipes[b].ustensils[d]){
                  spanFilterSelectedClick.setAttribute("class", "filtreClickUstensils");
                }
              }
            }
        })
    }
  }