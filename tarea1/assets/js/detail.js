let cadenaParametroUrl = location.search;// para tomar la dire de las tarjetas
let parametros = new URLSearchParams(cadenaParametroUrl); // para vincular la direcion que teniamos en las tarjetas x medio del get
let idCard = parametros.get("idUrl");//nombre del id que usamos para vincular cada tarjeta 
let contenedor = document.getElementById("detailed-card");//capturamos un elemento donde trabajaremos en el

 let propiedades;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then( info => info.json())
.then(info => {
  propiedades=info
  pintarCard(propiedades.events.find(tarjetita => tarjetita._id == idCard), contenedor)
  
})
.catch(err => console.log(err))

function pintarCard(propiedadEvents,contenedor) {
  contenedor.innerHTML = "";
  let asistencia = "";
  if(propiedadEvents.assistance){
  asistencia= `
    <dt>Assistance:</dt>
    <dd>${propiedadEvents.assistance}</dd>`
  } else {
    asistencia= `
    <dt>Estimate:</dt>
    <dd>${propiedadEvents.estimate}</dd>`
  }
  let template = `
    <img  class="detailed-img" src="${propiedadEvents.image}" alt="${propiedadEvents.name}">
 
                    <section class="detailed-descrip p-4">
                        <h2 class="text-center">${propiedadEvents.name}</h2>
                        <dl>
                            <dt>Date:</dt>
                            <dd>${propiedadEvents.date}</dd>
                            <dt>Description:</dt>
                            <dd>${propiedadEvents.description}</dd>
                            <dt>Category:</dt>
                            <dd>${propiedadEvents.category}</dd>
                            <dt>Place:</dt>
                            <dd>${propiedadEvents.place}</dd>
                            <div class="d-flex  justify-content-between flex-wrap">
                            <div>
                            <dt>Capacity:</dt>
                            <dd>${propiedadEvents.capacity}</dd>
                            </div>
                            <div>
                            ${asistencia}
                            </div>
                            <div>
                            <dt>Price:</dt>
                            <dd>${propiedadEvents.price}</dd>
                            </div>
                            </div>
                        </dl>
                    </section>`;

  contenedor.innerHTML = template;
}

pintarCard(cardEncontrada);