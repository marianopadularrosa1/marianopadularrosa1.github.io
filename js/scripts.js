

const createForm = (arrayOfFields, parentNode) => {
  if (parentNode.childNodes.length == 1) {
    for (const field of arrayOfFields) {
      let formGroup = document.createElement("div");
      let label = document.createElement("label");
      let element = document.createElement(field.element);
      element.setAttribute("id", field.fieldId);
      element.setAttribute("name", field.fieldId);
      element.setAttribute("label", field.fieldId);
      element.setAttribute("type", field.fieldType);
      element.setAttribute("class", field.class);
      if (field.readonly == "true") {
        element.setAttribute("readonly", "true");
      }
      if (field.required == "true") {
        element.required= true;
        //element.setAttribute("required","");
      }

      formGroup.setAttribute("class", "form-group");
      label.setAttribute("for", field.fieldId);
      if (field.fieldType == "submit") {
        element.setAttribute("value", field.value);
        element.setAttribute("onclick", field.onclick);
      } else {
        label.innerHTML =
          capitalize(field.innerHTML) != ""
            ? capitalize(field.innerHTML)
            : capitalize(field.fieldId);
      }
      formGroup.appendChild(label);
      formGroup.appendChild(element);
      parentNode.appendChild(formGroup);
    }
  }
};



/* Se invoca onclick del boton Solicitar */
const mostrarForm = () => {
  if (typeof getValorSeleccionado() != "undefined") {
    let inputForm = document.getElementById("inputForm");
    createForm(fieldsArrayForm, inputForm);
    let formCuotas = document.getElementById("formCuotas");
    createForm(fieldsArrayElegirFormaPago, formCuotas);

    let inputDiv = document.getElementById("inputDiv");
    let display = getComputedStyle(inputDiv).display;
    if (display == "none") inputDiv.style.display = "block";

   
    loadSelect("situacionTributaria", situacionTributariaArray);
    loadSelect("estadoCivil", estadoCivilArray);
    loadSelect("tarjetaCredito", tarjetaCreditoArray);
    document.getElementById("valorProducto").value = getValorSeleccionado();
    document.getElementById("nombreProducto").value = getProductoSeleccionado();
    document.getElementById("fechaNacimiento").addEventListener('focusout' , validarEdad);
  } else {
    $("#myModal").modal("show");
  }
};

const validarEdad =(event)=>{
    if(!getEsMayorDeEdad((document.getElementById("fechaNacimiento") || {}).value || "0")){
      $("#modalMenor").modal("show");
      document.getElementById("fechaNacimiento").style.borderColor = "red";
      document.getElementById("fechaNacimiento").style.borderWidth = "1px";
    }
}


/* Se invoca onclick del boton Elegir Forma Pago */
const inputData = () => {
  
  let dni = (document.getElementById("dni") || {}).value || "";
  let nombre = (document.getElementById("nombre") || {}).value || "";
  let apellido = (document.getElementById("apellido") || {}).value || "";
  let fechaNac = (document.getElementById("fechaNacimiento") || {}).value || "";
  let direccion = (document.getElementById("direccion") || {}).value || "";
  let email = (document.getElementById("email") || {}).value || "";
  let telefono = (document.getElementById("telefono") || {}).value || "";
  let situacionTributaria =
    (document.getElementById("situacionTributaria") || {}).value || "";
  let antiguedad = (document.getElementById("antiguedad") || {}).value || "";
  let ingresosMensuales =
    (document.getElementById("ingresosMensuales") || {}).value || "";
  let estadoCivil = (document.getElementById("estadoCivil") || {}).value || "";
  let ingresosMensualesPareja =
    (document.getElementById("ingresosMensualesPareja") || {}).value || "";
  let tarjetaCredito =
    (document.getElementById("tarjetaCredito") || {}).value || "";

  //esta valor sera obtenido despues que el solicitante elija
  let valorProducto = document.getElementById("valorProducto").value;
  /* Ejecucion - test */

  if(validarPersona(nombre,apellido,direccion,email,telefono,fechaNac,situacionTributaria,antiguedad,estadoCivil,ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni)){
    /* Datos obtenidos del formulario  */
    let p = new Persona(
      nombre,
      apellido,
      direccion,
      email,
      telefono,
      fechaNac,
      situacionTributaria,
      antiguedad,
      estadoCivil,
      ingresosMensuales,
      ingresosMensualesPareja,
      tarjetaCredito,
      dni
    );
  
    p.getPuntajeTotal();
    for (const propiedad in p) {
      console.log(propiedad + ":" + p[propiedad]);
    }
    /* Despues de la eleccion del producto y completado los datos se realiza la solicitud del credito */
    let solicitudCredito = new SolicitudCredito(valorProducto);
    solicitudCredito.getAnalisisPuntaje(p.puntajeTotal);
    for (const propiedad in solicitudCredito) {
      console.log(propiedad + ":" + solicitudCredito[propiedad]);
    }
  
    loadSelect("selectCuotas", solicitudCredito.cuotas);
    document.getElementById("montoCuota").value =
      solicitudCredito.montoCuota != null ? solicitudCredito.montoCuota[0] : "0";
    document.getElementById("montoConInteres").value =
      solicitudCredito.montoConInteres;
    guardarSession("solicitudCredito", JSON.stringify(solicitudCredito));
  
    let selectCuotas = document.getElementById("selectCuotas");
    selectCuotas.addEventListener("change", updateMontoCuota);
    let formCuotas = document.getElementById("formCuotas");
    let display = getComputedStyle(formCuotas).display;
    if (display == "none") {  formCuotas.style.display = "block"}
    /*posicionar al form de cuotas */
    $('html').animate({scrollTop: $("#formCuotas").offset().top},'slow');
   
  }
  else{
    $("#modalPersonaNoValida").modal("show");
  }
};

updateMontoCuota = (event) => {
  if (document.getElementById("selectCuotas") != null) {
    let sc = JSON.parse(sessionStorage.getItem("solicitudCredito"));
    let idMonto = sc.cuotas.indexOf(parseInt(event.target.value));
    document.getElementById("montoCuota").value = sc.montoCuota[idMonto];
  }
};

/*validacion datos de la persona */
const validarPersona=(nombre,apellido,direccion,email,telefono,fechaNac,situacionTributaria,antiguedad,estadoCivil,ingresosMensuales,ingresosMensualesPareja,tarjetaCredito,dni)=>{
 
  let personaValida=true;
  if(nombre==""){
    document.getElementById("nombre").style.borderColor = "red";
    document.getElementById("nombre").style.borderWidth = "1px";
    personaValida=false;
  }
  if(apellido==""){
    document.getElementById("apellido").style.borderColor = "red";
    document.getElementById("apellido").style.borderWidth = "1px";
    personaValida=false;
  }
  if(direccion==""){
    document.getElementById("direccion").style.borderColor = "red";
    document.getElementById("direccion").style.borderWidth = "1px";
    personaValida=false;
  }
  if(telefono==""){
    document.getElementById("telefono").style.borderColor = "red";
    document.getElementById("telefono").style.borderWidth = "1px";
    personaValida=false;
  }
  if(email=="" || (email.toString().split("@").length) !=2 ){
    document.getElementById("email").style.borderColor = "red";
    document.getElementById("email").style.borderWidth = "1px";
    personaValida=false;
  }
  if(dni=="" ){
    document.getElementById("dni").style.borderColor = "red";
    document.getElementById("dni").style.borderWidth = "1px";
    personaValida=false;
  }
  if(fechaNac=="" || !getEsMayorDeEdad(fechaNac) ){
    document.getElementById("fechaNacimiento").style.borderColor = "red";
    document.getElementById("fechaNacimiento").style.borderWidth = "1px";
    personaValida=false;
  }
  if(ingresosMensuales=="" ){
    document.getElementById("ingresosMensuales").style.borderColor = "red";
    document.getElementById("ingresosMensuales").style.borderWidth = "1px";
    personaValida=false;
  }
  if(personaValida){
    $('#inputForm>div').children(".form-control").css('border-color','grey');
    $('#inputForm>div').children(".form-control").prop("readonly", true);
    $('#inputForm>div>select').attr("disabled", true);
    
  }
  return personaValida;
}

getEdad=  (fechaNacimiento) =>{
  const anioNac= (parseDate(fechaNacimiento)).getFullYear() ;
  const today =new Date().getFullYear();
  const ageDifMs = today - anioNac;
  return ageDifMs;
}
getEsMayorDeEdad = (fechaNacimiento)=>{
  let edad =  getEdad(fechaNacimiento);
  if(edad >=18 )return true;
  else return false;
}

/* Inicializa productos de cada html */
function inicializarProd() {
  let htmlActual =
    document.documentURI.split("/")[document.documentURI.split("/").length - 1];
  if (htmlActual == "smartphone.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfSmartphones, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();
  } else if (htmlActual == "tecno.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfTecno, productos);
    createFooter();
    createModal();
    createModalPersona();createModalMenor();
  } else if (htmlActual == "xp.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfXP, productos);
    createFooter();
    createModal();
    createModalPersona();createModalMenor();
  }
}
/*Cuando se carga la pagina onload */
document.addEventListener("DOMContentLoaded", function (event) {
  addCSS(document.body);
  /*inicializacion de productos */
  inicializarProd();
  let myRadios = document.querySelectorAll("[name=radio]");
  myRadios.forEach((input) => {
    input.addEventListener("change", updateValorProducto);
  });
});
/* actualiza el valor del producto cuando el user cambia la seleccion del producto */
updateValorProducto = (event) => {
  if (document.getElementById("valorProducto") != null) {
    document.getElementById("valorProducto").value = event.target.value;
    document.getElementById("nombreProducto").value = event.target.id;
    guardarSession("valorProducto", event.target.value);
    guardarSession("nombreProducto", event.target.id);
  }
};

/* solo se podra un producto a la vez antes de solicitar el credito */
function unselect() {
  document.querySelectorAll("[name=radio]").forEach((x) => (x.checked = false));
}
/* obtener el radio seleccionado */
let getValorSeleccionado = () => {
  if (document.querySelector("[name=radio]:checked") != null) {
    return document.querySelector("[name=radio]:checked").value;
  }
};
/* obtener el radio seleccionado */
let getProductoSeleccionado = () => {
  if (document.querySelector("[name=radio]:checked") != null) {
    return document.querySelector("[name=radio]:checked").id;
  }
};

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

const createProductos = (arrayOfCards, parentNode) => {
  for (const card of arrayOfCards) {
    let divPpal = document.createElement("div");
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    let div3 = document.createElement("div");
    let h4 = document.createElement("h4");
    let p = document.createElement("p");
    let input = document.createElement("input");
    let label = document.createElement("label");
    divPpal.setAttribute("class", "col-lg-4 col-md-6 mb-4");
    div2.setAttribute("class", "card h-100");
    img.setAttribute("height", "250px");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", card.cardSrc);
    img.setAttribute("data-toggle", "popover");
    img.setAttribute("data-trigger", "hover");
    div3.setAttribute("class", "card-body");
    h4.setAttribute("class", "card-title");
    h4.innerHTML = card.cardTitle;
    p.setAttribute("class", "card-text");
    p.innerHTML = card.cardText;
    input.setAttribute("type", card.radioType);
    input.setAttribute("id", card.radioId);
    input.setAttribute("name", card.radioType);
    input.setAttribute("class", card.radioType);
    input.setAttribute("value", card.radioValue);
    label.setAttribute("for", card.radioId);
    label.innerHTML = card.cardTitle;
    var br = document.createElement("br");
    div2.appendChild(img);
    div2.appendChild(div3);
    div3.appendChild(h4);
    div3.appendChild(p);
    div3.appendChild(input);
    div3.appendChild(label);
    div3.appendChild(br);
    divPpal.appendChild(div2);
    parentNode.appendChild(divPpal);
  }
};

createFooter = () => {
  let footer = document.createElement("footer");
  footer.setAttribute("id", "footer");
  footer.setAttribute("class", "footer");
  let div = document.createElement("div");
  div.setAttribute("class", "container py-4");
  let div2 = document.createElement("div");
  div2.setAttribute("class", "copyright");
  div2.innerHTML =
    "&copy; Copyright <strong><span>SmartCredit</span></strong>. All Rights Reserved";
  let div3 = document.createElement("div");
  let div4 = document.createElement("div");
  div4.innerHTML = `<div class="icon"><i class="bx bx-mobile"></i></div>`;
  div3.setAttribute("class", "credits");
  div3.innerHTML = "Designed by <strong><span>MP</span></strong>";
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  footer.appendChild(div);
  document.body.appendChild(footer);
};

createModal = () => {
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", "myModal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("data-bs-backdrop","static");
  modal.setAttribute("data-bs-keyboard","false");
  modal.innerHTML = `<!-- Modal -->
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <p>Seleccione un Producto antes de avanzar</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
};

createModalPersona = () => {
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", "modalPersonaNoValida");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("data-bs-backdrop","static");
  modal.setAttribute("data-bs-keyboard","false");
  modal.innerHTML = `<!-- Modal -->
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <p>Complete todos los datos obligatorios antes de avanzar</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
};

createModalMenor = () => {
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", "modalMenor");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("data-bs-backdrop","static");
  modal.setAttribute("data-bs-keyboard","false");
  modal.innerHTML = `<!-- Modal -->
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">SmartCredit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <p>Debe ser mayor de 18 años para solicitar un Credito</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
};
addCSS=(parentNode)=>{
    let link1 = document.createElement('link');
    let link2 = document.createElement('link');
    let link3 = document.createElement('link');
    let link4 = document.createElement('link');
    let link5 = document.createElement('link');
    let link6 = document.createElement('link');
    let link7 = document.createElement('link');
    link1.setAttribute("href","/css/styles.css");
    link2.setAttribute("href","/assets/css/style.css");
    link3.setAttribute("href","/assets/vendor/aos/aos.css");
    link4.setAttribute("href","/assets/vendor/bootstrap-icons/bootstrap-icons.css");
    link5.setAttribute("href","/assets/vendor/boxicons/css/boxicons.min.css");
    link6.setAttribute("href","/assets/vendor/glightbox/css/glightbox.min.css");
    link7.setAttribute("href","/assets/vendor/swiper/swiper-bundle.min.css");
    link1.setAttribute("rel","stylesheet");
    link2.setAttribute("rel","stylesheet");
    link3.setAttribute("rel","stylesheet");
    link4.setAttribute("rel","stylesheet");
    link5.setAttribute("rel","stylesheet");
    link6.setAttribute("rel","stylesheet");
    link7.setAttribute("rel","stylesheet");
    parentNode.appendChild(link1);
    parentNode.appendChild(link2);
    parentNode.appendChild(link3);
    parentNode.appendChild(link4);
    parentNode.appendChild(link5);
    parentNode.appendChild(link6);
    parentNode.appendChild(link7);
}


$("#button1").click(function() {
  $('html').animate({
      scrollTop: $("#inputForm").offset().top},
      'slow');
});

