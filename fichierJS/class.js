class CarteRecette {
  constructor(name, ingredients, time, description){
    this.name=name;
    this.ingredients=ingredients;
    this.time=time;
    this.description=description;
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


    const infoIngredientsDescription= document.createElement("div");
    recipeInfo.appendChild(infoIngredientsDescription);
    infoIngredientsDescription.setAttribute("class", "infoIngredientsDescription")

    const ingredients= document.createElement("h3");
    infoIngredientsDescription.appendChild(ingredients);
    attribution(infoIngredientsDescription, ingredients, this.ingredients);
    ingredients.setAttribute("class", "recipeIngredients")

    const description= document.createElement("h4");   
    infoIngredientsDescription.appendChild(description);
    attribution(infoIngredientsDescription, description, this.description);
    description.setAttribute("class", "recipeDescription")
  }
}
