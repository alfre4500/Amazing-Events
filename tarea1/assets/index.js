
let indexjs = document.getElementById("cards-section")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")

function craftCards(lista, descriptionCards){
    let imagenes = ""
    for (let propiedadEvents of lista){
            let template =  `
                <div class="card" style="width: 16rem;">
                <img src="${propiedadEvents.image}" class="card-img-top" alt="${propiedadEvents.name}">
                    <div class="card-body">
                    <h5 class="card-title">${propiedadEvents.name}</h5>
                    <p class="card-text">${propiedadEvents.date}</p>
                    <p class="card-text">${propiedadEvents.category}</p>
                    <p class="card-text">${propiedadEvents.place}</p>
                    <p class="card-text">${propiedadEvents.price}</p>
                    <a href="./details.html?idUrl=${propiedadEvents._id}" class="btn btn-primary">View More</a>
                </div>
                </div> `
    imagenes =  imagenes + template
    }
    return imagenes
}

renderTemplate (craftCards(data.events), indexjs)

//Funcion para filtrar categorias

const sinRepetir = []
const categorias = data.events.map(events => events.category)

categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){
        sinRepetir.push (categorias)}
    })
    
//Creacion de los botones checkbox
    function generarCheckbox (categorias){
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
    check.innerHTML = generarCheckbox(sinRepetir)
    //inner para pasar checks a pantaia
    let checkbuttons = document.querySelectorAll(".form-check-input")
    //funcion para el filtro de los check
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
    
//funcion para el filtro del search
search.addEventListener( 'input', filtroCruzado)

function searchFood(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}
// funcion del filtro cruzado
function filtroCruzado(evento){
    const filterPerFind = searchFood (search, data.events)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">THERES NO COICIDENCES WITH YOUR SEARCH</h3>`
        renderTemplate(alert, indexjs)
    }
    else {
        renderTemplate(craftCards(filterPerCheack), indexjs)
    }
}
//funcion del rendertemplate
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

filtroCruzado()
