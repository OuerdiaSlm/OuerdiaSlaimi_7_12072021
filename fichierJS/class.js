class Recette {
  constructor(id,name, ingredients, time, description, appliance, ustensils){
    this.id=id;
    this.name=name;
    this.ingredients=ingredients;
    this.time=time;
    this.description=description;
    this.appliance=appliance;
    this.ustensils=ustensils;
  } 
  html() {
    let carteRecipe= document.getElementById("carteRecipe");

    const figureContainRecipe = document.createElement("figure");
    figureContainRecipe.setAttribute("class", "containRecipe");
    carteRecipe.appendChild(figureContainRecipe);

    const recipeImg= document.createElement("img");
    figureContainRecipe.appendChild(recipeImg);
    recipeImg.setAttribute("class", "RecipeImg");

    const recipeInfo= document.createElement("div");
    figureContainRecipe.appendChild(recipeInfo);
    recipeInfo.setAttribute("class", "recipeInfo")

    const infoNameTime= document.createElement("div");
    recipeInfo.appendChild(infoNameTime);
    infoNameTime.setAttribute("class", "infoNameTime")

    const name= document.createElement("h1");
    infoNameTime.appendChild(name);
    attribution(infoNameTime, name, this.name);
    name.setAttribute("class", "recipeName")

    const time = document.createElement("h2");
    infoNameTime.appendChild(time);
    attribution(infoNameTime, time, this.time+"min");
    time.setAttribute("class", "recipeTime")

    /*/*//*/*//*/////*//*/*//*/*//*/////*//*/*//*/*//*/////*//*/*//*/*//*/////*/
    const infoIngredientsDescription= document.createElement("div");
    recipeInfo.appendChild(infoIngredientsDescription);
    infoIngredientsDescription.setAttribute("class", "infoIngredientsDescription")

    const divTags = document.createElement("div");
    divTags.setAttribute("class", "classDivTags");
    infoIngredientsDescription.appendChild(divTags);

    const description= document.createElement("h4");   
    infoIngredientsDescription.appendChild(description);
    attribution(infoIngredientsDescription, description, this.description);
    description.setAttribute("class", "recipeDescription")

    /*/*//*/*//*/////*//*/*//*/*//*/////*//*/*//*/*//*/////*//*/*//*/*//*/////*/
    for (let x = 0; x < this.ingredients.length; x++) {
      const ingredients = document.createElement("h3");
      divTags.appendChild(ingredients);
      ingredients.setAttribute("class", "recipeIngredients")
      //attribution(divTags, ingredients, "#" + this.ingredients[x]);
      let quantity=this.ingredients[x].quantity;
      let unit=this.ingredients[x].unit;
      if (!this.ingredients[x].quantity ){
        quantity="";
      }
      if (!this.ingredients[x].unit){
        unit=" ";
      }
      if(x==0){
        attribution(divTags, ingredients, this.ingredients[x].ingredient+":"+" "+quantity+" "+unit);
        //
        //
      } else {
        addText(ingredients, this.ingredients[x].ingredient+":"+" "+quantity+" "+unit);
      }
    }
    
  }
  
}