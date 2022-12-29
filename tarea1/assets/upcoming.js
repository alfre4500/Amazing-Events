let espaciotrabajo = document.getElementById("tarjetas")
console.log(espaciotrabajo)


let tarjeta_eventos = document.createElement("div")

let todosloseventos = data.events

let fecha= data.currentDate
let eventosxvenir = []

for (let index = 0; index < todosloseventos.length; index++) {
  const element = todosloseventos[index];
  if(element.date> fecha){
   eventosxvenir.push(element)

  }
  
}
for (let index = 0; index < eventosxvenir.length; index++) {
  const element = eventosxvenir[index];

  
  tarjeta_eventos.innerHTML+=`<div class="card" style="width: 20rem;">
  <img src=${element.image} class="card-img-top imatarj" alt=${element.name}>
  <div class="card-body">
    <h5 class="card-title"> ${element.name} </h5>
    <p class="card-text"> ${element.description} </p>
    <div class="finalcarta">
      <p>Price $ ${element.price} </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  </div>`
}

tarjeta_eventos.className="tarjetero"





espaciotrabajo.appendChild(tarjeta_eventos)
console.log(eventosxvenir)
