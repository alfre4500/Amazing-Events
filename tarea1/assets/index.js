let espaciotrabajo = document.getElementById("tarjetas")
console.log(espaciotrabajo)


let tarjeta_eventos = document.createElement("div")

let eventos = data.events


console.log(eventos)

for (let index = 0; index < eventos.length; index++) {
  const element = eventos[index];

  
  tarjeta_eventos.innerHTML+=`<div class="card" style="width: 20rem;">
  <img src=${element.image} class="card-img-top imatarj" alt=${element.name}>
  <div class="card-body">
    <h5 class="card-title"> ${element.name} </h5>
    <p class="card-text"> ${element.description} </p>
    <div class="finalcarta">
      <p>Price $ ${element.price} </p>
      <a href="./details.html" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  </div>`
}

tarjeta_eventos.className="tarjetero"





espaciotrabajo.appendChild(tarjeta_eventos)

