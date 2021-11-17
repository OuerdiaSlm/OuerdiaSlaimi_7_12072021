let appareilTri = [];
let ingredientTri = [];
let ustensilsTri = [];
let displayedRecipes=[];

let allRecipes=[];
let recipesContain = [];

for (let i = 0; i < recipes.length; i++) {
  // Nouvelle class
  let carte = new Recette(
    recipes[i].id,
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
  let testConteur= 0;
  recipesContain = [];
  let exists = false;

  for (let i=0; i < allRecipes.length; i++){
    // Test le titre
    if(allRecipes[i].name.toLowerCase().search(word.toLowerCase())!== -1){
      testConteur++;
      displayedRecipes.push(allRecipes[i]);
      recipesContain.push(allRecipes[i]);
    }
    exists = false;
    //Evenement sur les ingredients
    for (let j=0; j < allRecipes[i].ingredients.length; j++){
      let ingredientsChemain = allRecipes[i].ingredients[j].ingredient;
      if(ingredientsChemain.toLowerCase().search(word.toLowerCase())!== -1){
        testConteur++;
        //allRecipes.html();
        for(r in recipesContain ){
          if(recipesContain[r].id == allRecipes[i].id){
            exists = true;
          }
        }
        if(!exists){
           recipesContain.push( allRecipes[i]);
        }
        displayedRecipes.push(allRecipes[i])
      }
    }
    exists = false;
    //Evenemnt sur les appareilles 
    if(allRecipes[i].description.toLowerCase().search(word.toLowerCase())!== -1){
      testConteur++;
      //allRecipes.html();
      for(r in recipesContain ){
        if(recipesContain[r].id == allRecipes[i].id){
          exists = true;
        }
      }
      if(!exists){
         recipesContain.push( allRecipes[i]);
      }
      displayedRecipes.push(allRecipes[i])
    }
    exists = false;
  }
  //Affichage des recettes
  for(r in recipesContain ){
    let elem = recipesContain[r];
    elem.html();
  }
  if (testConteur==0){
    let TextErreur=document.getElementById("TextErreur");
    TextErreur.style.display="block";
  } else{
    let TextErreur=document.getElementById("TextErreur");
    TextErreur.style.display="none";
  }
  displayIngredients(displayedRecipes);
  displayAppareilles(displayedRecipes);
  displayUstensiles(displayedRecipes);

  //clickFiltre=> fonction qui fait le click et le tri
  let filtre3 = document.getElementsByClassName("motsSuggerer");
  clickFiltre(filtre3, word);
  
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
  function clickFiltre(filtreclass, a=null){
    for (i=0; i<filtreclass.length; i++){
      filtreclass[i].addEventListener("click", function(e){
        resetData();
        if(a!=null)tabFiltre.push(a);  
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

document.querySelectorAll('.fa-chevron-up').forEach(chevron=>{
  chevron.addEventListener('click', function(){
    let details = chevron.parentNode.parentNode.parentNode;
    if(details.open) {
      details.removeAttribute("open");
    }
  })
})

document.querySelectorAll("summary").forEach(summary=>{
  summary.addEventListener("click", function(e){
    const elements = document.querySelectorAll("details:not(#"+e.target.parentNode.id+")");
    elements.forEach(elem=>{
      if(elem.open){
        elem.removeAttribute("open");
      }
    })
  })
})