let indexjs = document.getElementById("cards-section")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")
let Past
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( info => info.json())
.then(infotrabajable => {
 todalainfo = infotrabajable
  Past = todalainfo.events.filter(infox => infox.date < todalainfo.currentDate)
  check.innerHTML = generarCheckbox(todalainfo.events)
  renderTemplate(craftCards(Past), indexjs)
  check.addEventListener('change', filtroCruzado)
  search.addEventListener( 'input', filtroCruzado)

  
})
.catch( err => console.log(err)) 

//funcion para crear cards
function craftCards(lista){
  let imagenes = ""
  for (let cadaevento of lista){
          let template =  `
              <div class="card" style="width: 16rem;">
              <img src="${cadaevento.image}" class="card-img-top" alt="${cadaevento.name}">
                  <div class="card-body">
                  <h5 class="card-title">${cadaevento.name}</h5>
                  <p class="card-text">${cadaevento.date}</p>
                  <p class="card-text">${cadaevento.category}</p>
                  <p class="card-text">${cadaevento.place}</p>
                  <p class="card-text">${cadaevento.price}</p>
                  <a href="./details.html?idUrl=${cadaevento._id}" class="btn btn-primary">View More</a>
              </div>
              </div> `
  imagenes =  imagenes + template
  }
  return  imagenes//probar dps como return imagenes
}
  
//Creacion de los checkbox
    function generarCheckbox (lista){
        let categorias = new Set(lista.map( event =>event.category))
        let template = ""
        categorias.forEach(categoria =>{
            template += `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template
    }


// funcion del filtro check
function checkFilter (touchs, categoriesList){
  let values = [];
  for (let touch of touchs){
      if (touch.checked)
      values.push(touch.value.toLowerCase())
  }
  let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
  if (values.length === 0){
      return categoriesList
  }
  else{
      return filters
  }
}
check.addEventListener('change', filtroCruzado)
// search
 
search.addEventListener( 'input', filtroCruzado)

function searchFood(inputFind, categoriesList){
  const filterFood = categoriesList.filter(food => {
      return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
  });
  return filterFood
}
// funcion del filtro cruzado
function filtroCruzado(){
    let checkbtn = Array.from(check.querySelectorAll(`input[type="checkbox"]:checked`))
    
  const filterPerFind = searchFood (search, Past)
  const filterPerCheack = checkFilter (checkbtn, filterPerFind)
  if(filterPerCheack.length === 0) {
      let alert = `<h3 class="alert">THERES NO COICIDENCES WITH YOUR SEARCH</h3>`
      renderTemplate(alert, indexjs)
  }
  else {
      renderTemplate(craftCards(filterPerCheack), indexjs)
  }
}

//funcion render templeate

function renderTemplate (template,ubicacion){
    ubicacion.innerHTML = template
}