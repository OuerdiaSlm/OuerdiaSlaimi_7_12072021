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

  allRecipes.forEach(allRecipes=>{
    // Titre
    if(allRecipes.name.toLowerCase().search(word.toLowerCase())!== -1){
      testConteur++;
      displayedRecipes.push(allRecipes);
      recipesContain.push(allRecipes);
    }
    exists = false;
    //Evenement sur les ingredients
    allRecipes.ingredients.forEach(ingredientsE=>{
      let ingredientsChemain = ingredientsE.ingredient;
      if(ingredientsChemain.toLowerCase().search(word.toLowerCase())!== -1){
        testConteur++;
        
        recipesContain.forEach(recipesContainE=>{
          if(recipesContainE.id == allRecipes.id){
            exists = true;
          }
        })
        if(!exists){
           recipesContain.push( allRecipes);
        }
        displayedRecipes.push(allRecipes)
      }
    })
    exists = false;
    //Evenemnt sur les appareilles 
    if(allRecipes.appliance.toLowerCase().search(word.toLowerCase())!== -1){
      testConteur++;
      
      recipesContain.forEach(recipesContainE=>{
        if(recipesContainE.id == allRecipes.id){
          exists = true;
        }
      })
      if(!exists){
         recipesContain.push( allRecipes);
      }
      displayedRecipes.push(allRecipes)
    }
    exists = false;
    //Evenemnt sur les ustensiles 
    allRecipes.ustensils.forEach(ustensilsE=>{
      if(ustensilsE.toLowerCase().search(word.toLowerCase())!== -1){
        testConteur++;
        displayedRecipes.push(allRecipes);
       
        recipesContain.forEach(recipesContainE=>{
          if(recipesContainE.id == allRecipes.id){
            exists = true;
          }
        })
        if(!exists){
           recipesContain.push( allRecipes);
        }
      }
    })

  })
  recipesContain.forEach(recipesContainE=>{
    let elem = recipesContainE;
    elem.html();
  })
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

  let chevronClose1=document.getElementById("chevronClose1");
  chevronClose1.addEventListener("click", function() {
    let details= document.getElementById("motsCles1");
    if(details.open){
      details.removeAttribute("open");
    }
  });

  let chevronClose2=document.getElementById("chevronClose2");
  chevronClose2.addEventListener("click", function() {
    let details2= document.getElementById("motsCles2");
    if(details2.open){
      details2.removeAttribute("open");
    }
  });

  let chevronClose3=document.getElementById("chevronClose3");
  chevronClose3.addEventListener("click", function() {
    let details3= document.getElementById("motsCles3");
    if(details3.open){
      details3.removeAttribute("open");
    }
  });