/*Cuando se carga la pagina onload */
document.addEventListener("DOMContentLoaded", function (event) {
  AOS.init();
  sessionStorage.clear();
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
    document
      .getElementById("fechaNacimiento")
      .addEventListener("focusout", validarEdad);
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
      solicitudCredito.montoCuota != null
        ? solicitudCredito.montoCuota[0]
        : "0";
    
    document.getElementById("montoConInteres").value = solicitudCredito.montoConInteres;
    let nombreProducto = document.getElementById("nombreProducto").value;
    solicitudCredito.nombreProducto = nombreProducto;

   //Guarda en la session actual el objeto solicitud credito completo
    guardarSession("solicitudCredito", JSON.stringify(solicitudCredito));
    let selectCuotas = document.getElementById("selectCuotas");
    selectCuotas.addEventListener("change", updateMontoCuota);
    let formCuotas = document.getElementById("formCuotas");

    
    if (getComputedStyle(formCuotas).display == "none") {
      $("#formCuotas").slideDown(2000);
    }
    let cuotasElegidas = JSON.parse(sessionStorage.getItem("cuotasElegidas"));
    let montoCuotasElegidas = JSON.parse(sessionStorage.getItem("montoCuotasElegidas"));
    if(cuotasElegidas==null){
        cuotasElegidas = solicitudCredito.cuotas[0];
        guardarSession("cuotasElegidas", solicitudCredito.cuotas[0]);}
    if(montoCuotasElegidas==null){
      montoCuotasElegidas = solicitudCredito.montoCuota[0];
      guardarSession("montoCuotasElegidas", solicitudCredito.montoCuota[0]);}
    
    
   
    /*posicionar al form de cuotas */
    $("html").animate({ scrollTop: $("#formCuotas").offset().top }, "slow");
    //Guarda en la session actual el objeto solicitud credito completo
    guardarSession("solicitudCredito", JSON.stringify(solicitudCredito));
    //Luego de presionar el boton enviar, se obtendrá la solicitudCredito y persona antes de enviar
    $("#enviar").on("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      sendForm(p);
    });
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
    createModalSolicitudProcesada();
  } else if (htmlActual == "tecno.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfTecno, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();
    createModalEmail();
    createModalSolicitudProcesada();
  } else if (htmlActual == "xp.html") {
    let productos = document.getElementById("productos");
    createProductos(arrayOfXP, productos);
    createFooter();
    createModal();
    createModalPersona();
    createModalMenor();
    createModalEmail();
    createModalSolicitudProcesada();
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
//Metodo que enviará Todos los datos a SALESFORCE
//Cada id con formato varchar(15) por ejemplo="00N6g00000VAcrR" representa un campo del objeto Lead
//Salesforce interpretará el POST y creará una instancia del objeto Lead con todos los datos enviados en el POST
const sendForm = (persona) => {
  let solicitudCredito = JSON.parse(sessionStorage.getItem("solicitudCredito"));
  
  $("#enviar").prop("disabled", true);
  const APIURL =
    "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

  const infoPost = {
    "00N6g00000VAcrR": persona.puntajeTotal, //scoring
    oid: "00D6g000006uh5n", //Objeto Lead
    first_name: persona.nombre,
    last_name: persona.apellido,
    email: persona.email,
    "00N6g00000VAcrH": persona.ingresosMensuales, //salary
    "00N6g00000VAcrM": persona.ingresosMensualesPareja, //SalaryOfCouple
    "00N6g00000VAcrW": solicitudCredito.nombreProducto, //SelectedProduct
    "00N6g00000VAcrb": persona.preAprobado, //preapproved
    "00N6g00000VAcrg": persona.fechaNacimiento, //BirthDate
    "00N6g00000VAcrl": persona.dni,
    "00N6g00000VAcrv": persona.situacionTributaria,
    "00N6g00000VAcs5": persona.estadoCivil,
    "00N6g00000VAcsA": persona.tarjetaCredito,
    "00N6g00000VAcsF": solicitudCredito.montoConInteres, //valorProd
    "00N6g00000VAcsK": persona.antiguedad, //antiguedad
    "00N6g00000VAcsU": persona.direccion, //Address
    "00N6g00000VAcsZ": true, //SmartCreditFlag
    currency: "ARS",
    lead_source: "Web",
    mobile: persona.telefono,
    phone: persona.telefono,
    "00N6g00000VAyYq": JSON.parse(sessionStorage.getItem("cuotasElegidas")), //cuotasElegidas por el User
    "00N6g00000VAyYv": JSON.parse(sessionStorage.getItem("montoCuotasElegidas")) //montoCuota Elegidas por el user
  };
  
  $.ajax({
    method: "POST",
    url: APIURL,
    data: infoPost,
    success: function (respuesta) {
      $('#modalSolicitudProcesada').modal({backdrop: 'static', keyboard: false});
      $('button').on('click', ()=>{
        window.location.href = getHtmlIndex();
      })
    },
    error: function(error) {
      $('#modalSolicitudProcesada').modal({backdrop: 'static', keyboard: false});
      $('button').on('click', ()=>{
        window.location.href = getHtmlIndex();
      })
   }
  });
};

const getHtmlIndex=()=>{
  let htmlActual = document.documentURI.split("/")[document.documentURI.split("/").length - 1];
  return document.documentURI.replace(htmlActual,'index.html');
}
