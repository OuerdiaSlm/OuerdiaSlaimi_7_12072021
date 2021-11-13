let appareilTri = [];
let ingredientTri = [];
let ustensilsTri = [];
let displayedRecipes=[];

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
let startSearch= (word) =>{
  resetData();
  displayedRecipes = [];
  for (let i=0; i < allRecipes.length; i++){

    // Test le titre
    if(allRecipes[i].name.toLowerCase().search(word.toLowerCase())!= -1){
      allRecipes[i].html();
      displayedRecipes.push(allRecipes[i])
    } else{
      let TextErreur=document.getElementById("TextErreur");
      TextErreur.style.display="block";
    }

    //Evenement sur les ingredients
    for (let j=0; j < allRecipes[i].ingredients.length; j++){
      let ingredientsChemain = allRecipes[i].ingredients[j].ingredient;
      if(ingredientsChemain.toLowerCase().search(word.toLowerCase())!= -1){
        allRecipes[i].html();
        displayedRecipes.push(allRecipes[i])
      }
    }
    //Evenemnt sur les appareilles 
    if(allRecipes[i].appliance.toLowerCase().search(word.toLowerCase())!= -1){
      allRecipes[i].html();
      displayedRecipes.push(allRecipes[i])
    }
    //Evenemnt sur les ustensiles 
    for (let k=0; k < allRecipes[i].ustensils.length; k++){
      if(allRecipes[i].ustensils[k].toLowerCase().search(word.toLowerCase())!= -1){
        allRecipes[i].html();
        displayedRecipes.push(allRecipes[i])
      }
    }
  }
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
            //Attribution class
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



  
  let chevronClose=document.getElementById("chevronClose");
  chevronClose.addEventListener("click", function() {
    let sousRecherche1=document.getElementById("sousRecherche1");
    sousRecherche1.style.display= "none";
  });