/*Cuando se carga la pagina onload */
document.addEventListener("DOMContentLoaded", function (event) {
  AOS.init();
  if ($("#button1").length == 1) {
    $("#button1").click(function () {
      $("html").animate(
        {
          scrollTop: $("#inputForm").offset().top,
        },
        "slow"
      );
    });
  }
  /*inicializacion de productos */
  inicializarProd();
  let myRadios = document.querySelectorAll("[name=radio]");
  myRadios.forEach((input) => {
    input.addEventListener("change", updateValorProducto);
  });
});

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
    document.getElementById("fechaNacimiento").addEventListener("focusout", validarEdad);
    document.getElementById("email").addEventListener("focusout", validarEmail);
  } else {
    $("#myModal").modal("show");
  }
};

const createForm = (arrayOfFields, parentNode) => {
  if (parentNode.childNodes.length == 1) {
    for (const field of arrayOfFields) {
      let formGroup = document.createElement("div");
      formGroup.setAttribute("class", "form-group");
      formGroup.setAttribute("id", `form-group${field.fieldId}`);
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
        element.required = true;
      }
      if (field.placeholder != "") {
        element.setAttribute("placeholder", field.placeholder);
      }
      
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

  if (
    validarPersona(
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
    )
  ) {
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
      solicitudCredito.montoCuota != null ? solicitudCredito.montoCuota[0]: "0";
    document.getElementById("montoConInteres").value = solicitudCredito.montoConInteres;
    guardarSession("solicitudCredito", JSON.stringify(solicitudCredito));

    let selectCuotas = document.getElementById("selectCuotas");
    selectCuotas.addEventListener("change", updateMontoCuota);
    let formCuotas = document.getElementById("formCuotas");
    let display = getComputedStyle(formCuotas).display;
    if (display == "none") {
      $("#formCuotas").slideDown(2000);
      $("#enviar").on('click',(solicitudCredito, persona)=> {
        sendForm (solicitudCredito,p);
      });
    }
    /*posicionar al form de cuotas */
    $("html").animate({ scrollTop: $("#formCuotas").offset().top }, "slow");
  } else {
    $("#modalPersonaNoValida").modal("show");
  }
};

/* Inicializa productos de cada html */
function inicializarProd() {
  //obtengo el html actual que navego para crear los productos correspondientes
  let htmlActual =
    document.documentURI.split("/")[document.documentURI.split("/").length - 1];
  if (htmlActual == "smartphone.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfSmartphones, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();
    createModalEmail();
  } else if (htmlActual == "tecno.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfTecno, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();createModalEmail();
  } else if (htmlActual == "xp.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfXP, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();createModalEmail();
  }
}

/* crea las cards con cada producto basandose en un array */
const createProductos = (arrayOfCards, parentNode) => {
  let delayOfCard = 200;
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
    divPpal.setAttribute("data-aos", "fade-up");
    divPpal.setAttribute("data-aos-delay", delayOfCard);
    delayOfCard = delayOfCard + 100;
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

const sendForm =(solicitudCredito,persona)=>{
  const APIURL = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8' ; 
  
  let oid="00D6g000006uh5n";
  let retURL="https://marianopadularrosa1.github.io/";
  let l ="SmartCreditScoring";
  const infoPost =  { "00N6g00000VAcrR": persona.puntajeTotal, oid: "00D6g000006uh5n", "first_name":persona.nombre, "last_name":persona.apellido, "email":persona.email, "00N6g00000VAcrH":persona.ingresosMensuales }
  $.ajax({
    method: "POST",
    headers: {
      'Access-Control-Allow-Origin' : '*'
      },
    url:  APIURL,
    data: infoPost,
    success: function(respuesta){
        $("body").append(`<div>${respuesta.nombre}</div>`);
    }
});

}