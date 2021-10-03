function attribution(parent, enfant, data) {
  parent.appendChild(enfant);
  enfant.textContent = data;
}

function addText(enfant, data){
  enfant.textContent=enfant.textContent+data;
}


