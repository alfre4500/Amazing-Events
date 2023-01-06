let indexjs = document.getElementById("cards-section")//llame x id para enlazar html con js (en este caso las tarjetas)
const search = document.getElementById('search1')//
const check = document.getElementById("checkbox3")//trabajamos con los checkbox (el contenedor que va a tener los checkbox)

const upComing = data.events.filter(infox => infox.date >= data.currentDate)//filtramos  los objetos por medio del data.events  por medio de filtre

function craftCards(lista){
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

renderTemplate (craftCards(upComing), indexjs)// funcion que nos trae la cons upComing que ya definimos antes

//Funcion para filtrar categorias

const sinRepetir = []//const sin repetir nos genera un array vacio 
const categorias = upComing.map(events => events.category)//creamos un array en este caso con los eventos que filtramos

categorias.forEach(categorias => {//separamos todos los eventos en categorias y trabajamos con el array que obtuvimos  en la linea 32 
    if (!sinRepetir.includes (categorias)){//si no se repite se pushea y se guarda en el array vacio de la linea 31
        sinRepetir.push (categorias)}//se pushea lo NO REPETIDO
    })
    
//Creacion de los botones checkbox
    function generarCheckbox (categorias){//creamos los checkbox
        let template = ""//creamos un string vacio para ser llenado
        categorias.forEach(categoria =>{// x cada categoria  forEach ejecuta la función indicada una vez por cada elemento del array
            template += `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template// nos devuelve el string que estaba vacio y se fue llenando con la funcion(categorias) 
    }
    check.innerHTML = generarCheckbox(sinRepetir)// generamos la funcion con lo filtrado (categorias)
   
    //funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){// funcion con 2 parametros
        let valuescheckbox = [];// value es un array vacio
        for (let touch of touchs){//bucle que nos filtra si el checkbox esta tildado o no
            if (touch.checked)
            valuescheckbox.push(touch.value.toLowerCase())// si esta tildado lo pusheamos al array vacio(values)
        }
        let filters = categoriesList.filter(food => valuescheckbox.includes(food.category.toLowerCase()))
        if (valuescheckbox.length === 0){ //compara el value de los checkbox con la categoria de las cards
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)
    
    //funcion para el filtro del search
    search.addEventListener( 'input', filtroCruzado)
    
    function searchFood(inputFind, nombreDelEvento){//luego ocupara (search,upComing)
        const filterFood = nombreDelEvento.filter(food => {//creamos la constante filterfood que nos trae 
            return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
        });
        return filterFood
    }
    // funcion del filtro cruzado
    function filtroCruzado(evento){
        let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFood (search, upComing)
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





espaciotrabajo.appendChild(tarjeta_eventos)
console.log(eventosxvenir)
